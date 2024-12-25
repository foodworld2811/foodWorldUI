import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddUserComponent } from '../add-user/add-user.component';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  ismenurequired=false;
  username:string='';
  isAdminLoggedin:any;
  isBackiconrequired=false;
  constructor(private router:Router, private _dialog:MatDialog,
    private homeService:HomeService,
  private cdr: ChangeDetectorRef){
    this.isAdminLoggedin = sessionStorage.getItem('isAdminLoggedIn')
    this.username = sessionStorage.getItem('username') || '';
  }
ngDoCheck(): void {
   const currentUrl = this.router.url;
   if(currentUrl=='/login' || currentUrl=='/register'){
    this.ismenurequired=false
   }else{
    this.ismenurequired=true;
   }

   if(currentUrl == '/home'){
    this.isBackiconrequired = false
   }else{
    this.isBackiconrequired = true;
   }
  }
  openUserForm(){
    this._dialog.open(AddUserComponent)
  }

  logout(): void {
    sessionStorage.clear();
    this.isAdminLoggedin = false;
    this.router.navigate(['/login']);
  }
  
}
