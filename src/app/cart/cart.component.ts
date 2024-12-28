import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { HomeService } from '../services/home.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartItems: any[] = [];
  displayedColumns: string[] = ['itemImage', 'itemName', 'itemPrice'];
  sessionTimeoutMinutes = 10;
  selectedTableNumber: number | null = null;
  tableNumbers:any[]= [];
  itemIds: number[] = [];
  quantity: number[] = [];
  orderId:string | null = null;
  constructor(private cartService: CartService,
    private route:ActivatedRoute, private homeService: HomeService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // this.initializeCart();
    this.route.queryParams.subscribe((params)=>{
      this.orderId = params['orderId']
    })
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    })

    this.homeService.getTableNumbers().subscribe({
      next:(nums)=>{
        // console.log(nums);
        
        this.tableNumbers = nums.map((num:any) => num.tableName);
        console.log("tableNumbers",this.tableNumbers);
        
      }
    })
  }

  // initializeCart(){
  //   const cartData = JSON.parse(localStorage.getItem('cartItems') || '{}');
  //   const lastUpdated = cartData?.lastUpdated || null;
  //   const currentTime = Date.now();

  //   if(lastUpdated && currentTime - lastUpdated>this.sessionTimeoutMinutes * 60 *1000){
  //     this.clearCartWithMessage();
  //   }else{
  //     this.cartItems = cartData?.items || [];
  //     this.startSessionTimeout(currentTime,lastUpdated)
  //   }

  //   this.cartService.cartItems$.subscribe(items=>{
  //     this.cartItems = items;
  //     this.saveCartToLocalStorage()
  //   });
  // }

  // saveCartToLocalStorage(){
  //   const cartData = {
  //     items:this.cartItems,
  //     lastUpdated: Date.now()
  //   };
  //   localStorage.setItem('cartItems',JSON.stringify(cartData))
  // }

  // clearCartWithMessage(){
  //   localStorage.removeItem('cartItems');
  //   this.cartItems = [];
  //   alert('Your session has timed out. Cart items have been cleared.')
  // }
  // startSessionTimeout(currentTime:number,lastUpdated:number){
  //   const timeRemaining =this.sessionTimeoutMinutes * 60 * 1000 -(currentTime - (lastUpdated ||  currentTime))
  //   setTimeout(()=>{
  //     this.clearCartWithMessage();
  //   },timeRemaining)
  // }
  decreaseQuantity(item: any) {
    if (item.count > 0) {
      this.cartService.updateItemQuantity(item, item.count - 1);
      if (item.count === 0) {
        this.cartService.removeItem(item)
      }
    }
  }
  increaseQuantity(item: any) {
    this.cartService.updateItemQuantity(item, (item.count || 0) + 1)
  }

  checkout() {
    console.log("cartItems",this.cartItems);
    
    if (!this.selectedTableNumber) {
      this.authService.openSnackBar("Please select a table number before proceeding to checkout.")
      return;
    } else if (this.cartItems.length <= 0) {
      this.authService.openSnackBar("Your cart is Empty, Please Select items to contine...")
      return;
    }

    this.itemIds = this.cartItems.map(id => id.itemId)
    this.quantity = this.cartItems.map(id => id.count)
    this.homeService.saveOrderDetails(this.itemIds, this.quantity, this.selectedTableNumber).subscribe({
      next: (res) => {
        if (res) {
          this.authService.openSnackBar("Order Details Added Successfully")
          // this.cartService.clearCart();
          // localStorage.clear();
          // this.selectedTableNumber = null;
          this.router.navigate(['/order-details'])

        }
      },
      error: (err) => {
        console.log(err);

      }
    })


  }

  filteredTablenumbers(){
    
  }
}
