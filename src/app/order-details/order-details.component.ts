import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HomeService } from '../services/home.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{
  isAdminLoggedin: any;
  userName : any;
  displayedColumns: string[]=[
    "tableNumber",
    "orderStatus",
    "orderAction",
    "actions",
  ]
  

  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private homeService:HomeService, private dialog:MatDialog,
    private authService:AuthService,private router:Router, private http : HttpClient, private cartService : CartService){}

  ngOnInit(){
    this.isAdminLoggedin = sessionStorage.getItem('isAdminLoggedIn')
    const username = sessionStorage.getItem('username');
    if (username) {
      this.userName = username;
    } else {
      console.log('No username found in sessionStorage.');
    }

    if(this.isAdminLoggedin === 'true'){
      this.loadOrderDetails();
    }else{      
    this.getOrderDetailsByUserName();
    }
  }

  loadOrderDetails(){
    this.homeService.getOrderDetails().subscribe({
      next:(res)=>{
        console.log("getOrderDetails",res);
        
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  deleteOrderDetails(id:number){
    const dialogRef = this.dialog.open(ConfirmDialogComponent)
    dialogRef.afterClosed().subscribe((confirm)=>{
      if(confirm){
        this.homeService.deleteOrder(id).subscribe({
          next:(res)=>{
            this.authService.openSnackBar("Order Deleted Successfully")
            this.loadOrderDetails();
          }
        })
      }else{
        this.authService.openSnackBar("Delete Action canceled", "cancel")
      }
    })
    
  }

  openEditOrderDetails(orderId: string) {
    const url = `http://localhost:8080/api/orders/items/${orderId}`;
    this.http.get<any[]>(url).subscribe({
      next: (orderItems) => {
        console.log('Order items fetched from backend:', orderItems);
  
        // Transform the backend response
        const transformedItems = orderItems.map(item => ({
          categoryName: item.categoryName,
          count: item.quantity, // Map 'quantity' to 'count'
          itemId: item.itemId,
          itemImage: item.itemImage,
          itemName: item.itemName,
          itemPrice: item.itemPrice,
          itemstatus: item.itemstatus,
          tableNumber: item.tableNumber,
          orderId: item.orderId
        }));
  
        console.log('Transformed order items:', transformedItems);
  
        // Save transformed items to storage
        this.cartService.saveCartToStorage(transformedItems); 
        this.router.navigate(['/home'],{queryParams:{orderId}}).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        console.error('Error fetching order details:', err);
      }
    });
  }
  

  viewOrders(orderId:number){
    this.router.navigate(['view-orders'],{queryParams:{orderId}})
  }

  getOrderDetailsByUserName(){
    console.log("getOrderDetailsByUserName method called",this.userName);
    this.homeService.getOrderDetailsByUserName(this.userName).subscribe({
      next:(res)=>{
        console.log("getOrderDetailsByUserName",res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        console.log(err);
  }
})}
}
