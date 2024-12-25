import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartItems: any[]=[];
  constructor(private cartSarvice:CartService){}

  ngOnInit(){
    this.cartItems = this.cartSarvice.getCartItems();
    console.log(this.cartItems);
    
  }
}
