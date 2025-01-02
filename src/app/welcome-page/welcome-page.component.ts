import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { HomeComponent } from '../home/home.component';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit{
  isAdminLoggedin:any;
  totalItemsCount!:number;
  
  constructor(private router:Router,private cartService:CartService,private homeService:HomeService){
    homeService.isAdmin$.subscribe(isAdmin=>{
      this.isAdminLoggedin = isAdmin;
    })
  }
 

  ngOnInit(){
    this.cartService.totalItems$.subscribe(total=>{
      this.totalItemsCount=total;
    })

    
  }
  logout(): void {
    sessionStorage.clear();
    this.isAdminLoggedin = false;
    this.router.navigate(['/login']);
  }
}
