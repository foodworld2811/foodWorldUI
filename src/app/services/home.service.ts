import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private usernameSubject = new BehaviorSubject<string>('');
 private isAdminSubject = new BehaviorSubject<boolean>(false);

 username$ = this.usernameSubject.asObservable();
  isAdmin$ = this.isAdminSubject.asObservable();
  constructor(private http:HttpClient) {

    const storedUsername = sessionStorage.getItem('username') || '';
    const storedIsAdmin =sessionStorage.getItem('isAdminLoggedIn') === 'true';

    this.usernameSubject.next(storedUsername);
    this.isAdminSubject.next(storedIsAdmin)
   }

  

  setUsername(username: string):void{
    sessionStorage.setItem('username',username);
    this.usernameSubject.next(username);
    
  }
  setIsAdmin(isAdmin: boolean) :void{
    sessionStorage.setItem('isAdminLoggedIn',String(isAdmin))
    this.isAdminSubject.next(isAdmin);
    
  }
  getItems():Observable<any>{
    return this.http.get('http://localhost:8080/api/categories')
  }

  addItems(data: any):Observable<any>{
    console.log(data);
    
    return this.http.post('http://localhost:8080/api/categories',data)
  }

  addsubCategoryItems(data:any):Observable<any>{
    return this.http.post('http://localhost:8080/api/categoryItems',data)
  }

  getSubCategoryItems():Observable<any>{
    return this.http.get('http://localhost:8080/api/categoryItems')
  }
}
