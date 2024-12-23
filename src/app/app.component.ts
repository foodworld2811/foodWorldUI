import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  title = 'Rest-App';
  ismenurequired=false;
  constructor(private router:Router, private _dialog:MatDialog){
     
  }
  ngDoCheck(): void {
   let currentUrl = this.router.url;
   if(currentUrl=='/login' || currentUrl=='/register'){
    this.ismenurequired=false
   }else{
    this.ismenurequired=true;
   }
  }
    @Output() menuClick = new EventEmitter<void>();  
    
    openUserForm(){
      this._dialog.open(AddUserComponent)
    }
}
