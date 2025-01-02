import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { CategoryComponent } from '../category/category.component';
import { ActivatedRoute, Router } from '@angular/router';

interface CategoryItems {
  categoryTitle: string;
  categoryStatus: boolean;
  img: string;
  
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foodItemsArray: any = [];
  catagoryItems: CategoryItems[] = [];
  ismenurequired=false;
  username:string='';
  isAdminLoggedin :any;
  isLoading: boolean = false;
  constructor(
    private homeService: HomeService,
    private _dialog: MatDialog,
    private router:Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCategoryList();
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
   }  
  private getCategoryList(): void {
    this.isLoading=true;
    this.homeService.getItems().subscribe(
      (response) => {
        this.isLoading=false;
        this.foodItemsArray = response;
      },
      (error) => {
        console.error("Error occurred while fetching user list", error);
      }
    );
  }

  openCategoryForm(): void {
    const dialogRef = this._dialog.open(CategoryComponent);
    dialogRef.afterClosed().subscribe({
            next:(val)=>{
              if(val){
                // this.getFoodItemsList();
                this.getCategoryList();
              }
            }
          })
  }

editCategoryForm(id:number){
  const data = this.foodItemsArray[id];
  console.log("data",data);
  
  const dialogRef = this._dialog.open(CategoryComponent,{data})
  dialogRef.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.getCategoryList();
      }
    }
  })
}
}