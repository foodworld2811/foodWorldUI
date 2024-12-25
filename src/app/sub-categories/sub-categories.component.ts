import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { HomeService } from '../services/home.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddSubCategoriesComponent } from '../add-sub-categories/add-sub-categories.component';
import { count } from 'rxjs';
import { CartService } from '../services/cart.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css']
})
export class SubCategoriesComponent {
  subCategoryItems: any = [];
  categoryTitle: string | null = null;
  isAdminLoggedin: any;
  cartItems:any[]=[];
  constructor(private route: ActivatedRoute,
    private homeService: HomeService,
    private dialog: MatDialog,
     private cartService:CartService) { }

  ngOnInit() {
    this.isAdminLoggedin = sessionStorage.getItem('isAdminLoggedIn')
    this.route.paramMap.subscribe(params => {
      this.categoryTitle = params.get('category');
      // console.log(this.categoryTitle);
      this.loadSubCategories();

    })
  }

  loadSubCategories() {
    this.homeService.getSubCategoryItems().subscribe({
      next: (data: any) => {
        this.subCategoryItems = data.filter((item: any) => item.categoryName === this.categoryTitle)
        .map((item:any)=>({...item,count:0}));
        // console.log(this.subCategoryItems);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  opensubCategoryForm() {
    this.dialog.open(AddSubCategoriesComponent, {
      data: { categoryTitle: this.categoryTitle }
    })
  }
  decreaseCount(index:number){
    if(this.subCategoryItems[index].count>0){
      this.subCategoryItems[index].count--;
      if(this.subCategoryItems[index].count===0){
        this.cartService.removeItem(this.subCategoryItems[index]);
        this.cartItems=this.cartService.getCartItems();
      }
    }
  }
  increaseCount(index:number){
    this.subCategoryItems[index].count++;
    if(this.subCategoryItems[index].count>0){
      this.cartService.addItem(this.subCategoryItems[index],1)
      // this.subCategoryItems[index].count = 0;
    }
  }

  editSubCategoryForm(index:number){
    const data = this.subCategoryItems[index];
    console.log(data);
    
    this.dialog.open(AddSubCategoriesComponent,{data})
  }

}
