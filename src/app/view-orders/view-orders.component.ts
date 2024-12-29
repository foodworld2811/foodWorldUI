import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { HomeService} from '../services/home.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit{

constructor(private route:ActivatedRoute,private homeService:HomeService){}
  orderId!: number; 
  orderItems: any[] = [];
ngOnInit(){
  this.route.queryParams.subscribe(params => {
    this.orderId = +params['orderId']; 
    console.log('Order ID:', this.orderId);
  });
  this.getOrderItems();
}

getTotal(price: number, quantity: number): number {
  console.log('Price:', price, 'Quantity:', quantity);
  return price * quantity;
}

getOrderItems(): void {
  this.homeService.getOrderItems(this.orderId).subscribe(
    (data) => {
      this.orderItems = data;
      console.log('Order Items:', this.orderItems);
    },
    (error) => {
      console.error('Error fetching order items', error);
    }
  );
}

getSubTotal(): number {
  return this.orderItems.reduce((total, item) => total + this.getTotal(item.itemPrice, item.quantity), 0);
}

getGST(): number {
  return this.getSubTotal() * 0.05;  // 5% GST
}

getTotalAmount(): number {
  return this.getSubTotal() + this.getGST();
}


}
