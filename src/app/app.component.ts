import { ChangeDetectorRef, Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Rest-App';
  // ismenurequired=false;
  // username:string='';
  // isAdminLoggedin:boolean = false;
  constructor(private router:Router,
    private homeService:HomeService,
  private cdr: ChangeDetectorRef){
    // this.username = sessionStorage.getItem('username') || '';
    // this.isAdminLoggedin = sessionStorage.getItem('isAdminLoggedIn') === 'true';
  }
  // ngDoCheck(): void {
  //  const currentUrl = this.router.url;
  //  if(currentUrl=='/login' || currentUrl=='/register' || currentUrl =='/user-details'){
  //   this.ismenurequired=false
  //  }else{
  //   this.ismenurequired=true;
  //  }
  // }  
    
    
}
