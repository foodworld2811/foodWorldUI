import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{
  isAdminLoggedin: any;
  userName : any;
  isLoading: boolean = false;
  orderItems:any[] = [];
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
    this.isLoading = true;
    this.homeService.getOrderDetails().subscribe({
      next:(res)=>{
        this.isLoading=false;
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
        this.isLoading = true;
        this.homeService.deleteOrder(id).subscribe({
          next:(res)=>{
            this.isLoading= false;
            this.authService.openSnackBar("Order Deleted Successfully")
            this.loadOrderDetails();
          }
        })
      }else{
        this.authService.openSnackBar("Delete Action canceled", "cancel")
      }
    })
    
  }

  openEditOrderDetails(orderId: number) {
    this.homeService.getOrderDetailsByOrderId(orderId).subscribe({
      next: (order) => {
        this.orderItems = order;
        const transformedItems = this.orderItems.map((item:any) => ({
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
        this.cartService.saveCartToStorage(transformedItems); 
        this.router.navigate(['/home'],{queryParams:{orderId}}).then(() => {
          window.location.reload();
        });
      },
      error: (err:any) => {
        console.error('Error fetching order details:', err);
      }
    });
  }
  

  viewOrders(orderId:number){
    this.router.navigate(['view-orders'],{queryParams:{orderId}})
  }

  getOrderDetailsByUserName(){
    this.homeService.getOrderDetailsByUserName(this.userName).subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        console.log(err);
  }
})}

}
