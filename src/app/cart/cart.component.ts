import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { HomeService } from '../services/home.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  displayedColumns: string[] = ['itemImage', 'itemName', 'itemPrice'];
  sessionTimeoutMinutes = 10;
  selectedTableNumber: number | null = null;
  tableNumbers: any[] = [];
  itemIds: number[] = [];
  quantity: number[] = [];
  orderId: string | null = null;
  tableStatus: boolean | null = null;
  isTableSelected: boolean = false; // This will control whether the dropdown is disabled or not
  isLoading: boolean = false;
  createdBy : any;

  constructor(
    private cartService: CartService,
    private homeService: HomeService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.orderId = items[0]?.orderId;
      const storedTableNumber = items[0]?.tableNumber;
      if (storedTableNumber) {
        this.selectedTableNumber = storedTableNumber; // Set the selected table number
        this.isTableSelected = true; // Disable the select field
      }
      this.cartItems = [...items];
      console.log("orderId in cart component : ", this.orderId);
    });

    // Fetch table numbers
    this.homeService.getTableNumbers().subscribe({
      next: (nums) => {
        this.tableNumbers = nums.map((num: any) => num.tableName);
        console.log("tableNumbers", this.tableNumbers);
      }
    });
    const username = sessionStorage.getItem('username');
    if (username) {
      this.createdBy = username;
      console.log('Username:', username);
    } else {
      console.log('No username found in sessionStorage.');
}
  }

  decreaseQuantity(item: any) {
    if (item.count > 0) {
      this.cartService.updateItemQuantity(item, item.count - 1);
      if (item.count === 0) {
        this.cartService.removeItem(item);
      }
    }
  }

  increaseQuantity(item: any) {
    this.cartService.updateItemQuantity(item, (item.count || 0) + 1);
  }

  checkout() {
    console.log("cartItems", this.cartItems);

    if (!this.selectedTableNumber) {
      this.authService.openSnackBar("Please select a table number before proceeding to checkout.");
      return;
    } else if (this.cartItems.length <= 0) {
      this.authService.openSnackBar("Your cart is Empty, Please Select items to continue...");
      return;
    } else if (!this.orderId && !this.tableStatus) {
      this.authService.openSnackBar("Table is already occupied, Please select another table number");
      return;
    }

    this.itemIds = this.cartItems.map(id => id.itemId);
    this.quantity = this.cartItems.map(id => id.count);
    this.isLoading = true;
    if (this.orderId) {
      console.log("Update Order Details");
      this.homeService.updateOrderDetails(this.orderId, this.itemIds, this.quantity).subscribe({
        next: (res) => {
          this.isLoading=false;
          if (res) {
            this.authService.openSnackBar("Order Details Updated Successfully");
            this.cartService.clearCart();
            localStorage.clear();
            this.router.navigate(['/order-details']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        }
      });
    } else {
      console.log("Save Order Details");
      this.homeService.saveOrderDetails(this.itemIds, this.quantity, this.selectedTableNumber,this.createdBy).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res) {
            this.authService.openSnackBar("Order Details Added Successfully");
            this.cartService.clearCart();
            localStorage.clear();
            this.router.navigate(['/order-details']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        }
      });
    }
  }

  onTableSelect(event: Event): void {
    if (this.selectedTableNumber) {
      this.checkTableStatus(this.selectedTableNumber.toString());
    }
  }

  checkTableStatus(tableNumber: string): void {
    this.homeService.checkTableStatusByTableNumber(tableNumber)
      .subscribe({
        next: (status) => {
          this.tableStatus = status;
        },
        error: (err) => {
          console.error('Error checking table status:', err);
          this.tableStatus = null; // Reset or handle error state
        },
      });
  }

  
}
