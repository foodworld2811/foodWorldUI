import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HomeService } from '../services/home.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{
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
    private authService:AuthService,private router:Router){}

  ngOnInit(){
    this.loadOrderDetails();
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

  openEditOrderDetails(orderId:string){
    this.router.navigate(['/cart'],{queryParams:{orderId}})
  }

  viewOrders(orderId:number){
    this.router.navigate(['view-orders'],{queryParams:{orderId}})
  }
}
