import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit{
  orderId:any;
  orderItems: any[] = [];
  itemIds:any[]=[];
  quantities:any[]=[];
  categoryItems:any[]=[];
  itemNames:string[]=[];
  prices:string[]=[];
constructor(private route:ActivatedRoute,private homeService:HomeService){}

ngOnInit(){
  this.route.paramMap.subscribe((params)=>{
    this.orderId = params;
  })
}

loadOrderItems(){
  this.homeService.getOrderItems(this.orderId).subscribe({
    next:(res)=>{
      this.orderItems = res;
      this.itemIds = this.orderItems.map(item=> item.itemId);
      this.quantities = this.orderItems.map(count=> count.quantity);
      this.homeService.getSubCategoryItems().subscribe({
        next:(data)=>{
          this.categoryItems = data;
          
          this.orderItems = this.orderItems.map((orderItem)=>{
            const categoryItem = this.categoryItems.find(
              (item)=> item.itemId === orderItem.itemId
            );

            if(categoryItem){
              return{
                ...orderItem,
                itemName:categoryItem.itemName,
                itemPrice: categoryItem.itemPrice,
              };
            }else{
              return orderItem;
            }
          });
          console.log(this.orderItems);
          
        },
        error:(err)=>{
          console.log('Error loading order items:',err);
          
        }
      })
    }
  })
}
}
