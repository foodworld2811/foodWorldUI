import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "https://foodworldbe1.onrender.com"
  constructor(private _snackBar:MatSnackBar, private _http:HttpClient) { }

  openSnackBar(message:any, action: any = 'OK'){
    this._snackBar.open(message,action,{duration:3000,verticalPosition:'bottom'

    })
  }

  addUser(data: any):Observable<any>{
    return this._http.post(`${this.apiUrl}/users`,data)
  }

  getUsers():Observable<any>{
    return this._http.get(`${this.apiUrl}/users`)
  }

  updateUserDetails(id:number,data:any):Observable<any>{
    return this._http.put(`${this.apiUrl}/users/${id}`,data)
  }

  deleteUser(id:number):Observable<any>{
    return this._http.delete(`${this.apiUrl}/users/${id}`)
  }
  Islogged(data: any):Observable<any>{
      return this._http.post(`${this.apiUrl}/login`,data);
     }

  loggedIn(){
    return sessionStorage.getItem('username')!=null;
  }
}
