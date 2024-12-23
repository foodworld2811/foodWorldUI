import { Component } from '@angular/core';
import { HomeService } from '../services/home.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  foodItemsArray:any =[];
  constructor(private homeService:HomeService,private _dialog:MatDialog){
    this.getFoodItemsList();
  }

getFoodItemsList(){
    this.homeService.getItems().subscribe({
      next:(res)=>{
        console.log(res);
        
        this.foodItemsArray = res;
      }
    })
  }

  openCategoryForm(){
    this._dialog.open(CategoryComponent)
  }
}
