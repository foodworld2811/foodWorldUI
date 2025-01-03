import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>(this.getCartFromStorage());
  private totalItemsSubject =  new BehaviorSubject<number>(this.calculateTotalItemsCount())
  totalItems$ = this.totalItemsSubject.asObservable();
  cartItems$ = this.cartItems.asObservable();
  constructor() { }

  private getCartFromStorage(): any[] {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  saveCartToStorage(cartItems: any[]) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }
  addItem(item: any, quantity: number) {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(i => i.itemId === item.itemId);
    if (existingItem) {
      existingItem.count += quantity;
    } else {
      currentItems.push({ ...item, count: quantity })
    }
    this.cartItems.next([...currentItems]);
  }

  removeItem(item: any) {
    const currentItems = this.cartItems.getValue().filter(i => i.itemId !== item.itemId);
    this.cartItems.next([...currentItems])
    this.saveCartToStorage(currentItems)
    this.totalItemsSubject.next(this.calculateTotalItemsCount());
  }

  getCartItems() {
    return this.cartItems.getValue;
  }

  updateItemQuantity(item: any, count: number) {
    const currentItems = this.cartItems.getValue();
    const index = currentItems.findIndex(i => i.itemId === item.itemId);

    if (index > -1) {
      if (count === 0) {
        currentItems.splice(index, 1);
      } else {
        currentItems[index].count = count;
      }
    } else if (count > 0) {
      currentItems.push({ ...item, count });
    }

    this.cartItems.next([...currentItems]);
    this.saveCartToStorage(currentItems);
    this.totalItemsSubject.next(this.calculateTotalItemsCount());
  }

  calculateTotalItemsCount():number{
    const currentItems = this.cartItems.getValue();
    if(!currentItems){
      return 0;
    }
    return currentItems.reduce((total,item)=> total+item.count,0)
    
  }

  clearCart(){
    this.cartItems.next([]);
    this.totalItemsSubject.next(this.calculateTotalItemsCount());
  }
}
