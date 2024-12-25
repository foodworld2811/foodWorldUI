import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
private cartItems:any[]=[];
  constructor() { }

  addItem(item:any,count:number){
    if(count>0){
      const existingItem = this.cartItems.find(cartItem=> cartItem.itemId===item.itemId);
      if(existingItem){
        existingItem.count +=count;
      }else{
        this.cartItems.push({...item,count})
      }
    }
  }

  removeItem(item:any){
    const index = this.cartItems.findIndex(cartItem=>cartItem.itemId === item.itemId);
    if(index !== -1){
      this.cartItems.splice(index,1);
    }
  }

  getCartItems(){
    return this.cartItems;
  }
}
