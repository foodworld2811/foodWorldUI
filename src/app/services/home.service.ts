import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private usernameSubject = new BehaviorSubject<string>('');
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  private addedItemsSubject = new BehaviorSubject<any>([]);
  addedItems = this.addedItemsSubject.asObservable();
  username$ = this.usernameSubject.asObservable();
  isAdmin$ = this.isAdminSubject.asObservable();

  apiUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {

    const storedUsername = sessionStorage.getItem('username') || '';
    const storedIsAdmin = sessionStorage.getItem('isAdminLoggedIn') === 'true';

    this.usernameSubject.next(storedUsername);
    this.isAdminSubject.next(storedIsAdmin)
  }



  setUsername(username: string): void {
    sessionStorage.setItem('username', username);
    this.usernameSubject.next(username);

  }
  setIsAdmin(isAdmin: boolean): void {
    sessionStorage.setItem('isAdminLoggedIn', String(isAdmin))
    this.isAdminSubject.next(isAdmin);

  }
  getItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`)
  }

  addItems(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories`, data)

  }
  updateItems(id:number,data:any):Observable<any>{
    return this.http.put(`${this.apiUrl}/categories/${id}`,data)
  }

  addsubCategoryItems(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/categoryItems`, data)
  }

  getSubCategoryItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categoryItems`)
  }

  updateSubCategoryItems(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/categoryItems/${id}`, data)
  }

  saveOrderDetails(itemIds: number[], quantities: number[], tableNumber: any): Observable<any> {
    const params = new HttpParams()
      .set('itemIds', itemIds.join(','))
      .set('quantities', quantities.join(','))
      .set('tableNumber', tableNumber)
    return this.http.post(`${this.apiUrl}/orders`, null, { params });
  }

  updateOrderDetails(orderId: string, itemIds: number[], quantities: number[]): Observable<any> {
    const params = new HttpParams()
      .set('itemIds', itemIds.join(','))
      .set('quantities', quantities.join(','))
    return this.http.put(`${this.apiUrl}/orders/${orderId}`, null, { params });
  }

  getOrderDetails():Observable<any>{
    return this.http.get(`${this.apiUrl}/orders`);
  }

  deleteOrder(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/orders/${id}`);
  }

  // getSavedcartItems():Observable<any>{
  //   return this.http.get(`${this.apiUrl}/`)
  // }
getOrderItems(id:number):Observable<any>{
  return this.http.get(`${this.apiUrl}/orders/items/${id}`)
}
  getTableNumbers():Observable<any>{
    return this.http.get(`${this.apiUrl}/tables`)
  }
}
