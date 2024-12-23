import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _snackBar:MatSnackBar, private _http:HttpClient) { }

  openSnackBar(message:any, action: any = 'OK'){
    this._snackBar.open(message,action,{duration:3000,verticalPosition:'top'

    })
  }

  addUser(data: any):Observable<any>{
    return this._http.post('http://localhost:3000/user',data)
  }

  Islogged(username: string):Observable<any>{
    return this._http.get(`http://localhost:3000/user?email=${username}`);
  }

  loggedIn(){
    return sessionStorage.getItem('username')!=null;
  }
}
