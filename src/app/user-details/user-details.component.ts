import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import {MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../services/auth.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  isLoading: boolean = false;
displayedColumns: string[]=[
  "id",
      "firstname",
      "lastname",
      "contact",
      "address",
      "username",
      "password",
      "action"
]
dataSource!: MatTableDataSource<any>;

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!:MatSort;
  constructor(private dialog:MatDialog,private authService:AuthService){}

  ngOnInit(){
    this.getUserDetails();
  }
  openAddUserForm(){
    const dialogRef=this.dialog.open(AddUserComponent)
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        this.authService.openSnackBar("User Added Successfully");
        this.getUserDetails();
      }
    })
  }

  getUserDetails(){
    this.isLoading = true;
    this.authService.getUsers().subscribe({
      next:(data)=>{
        this.isLoading = false;
        this.dataSource =  new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error:(err)=>{
        console.log(err);
        this.authService.openSnackBar("Failed to load User Details")
        
      }
    })
  }

  openEditUserDetailsForm(data:any){
    console.log(data);
    
    const dialogRef=this.dialog.open(AddUserComponent,{data});
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getUserDetails();
        }
      }
    })
  }
  deleteUserDetail(id:number){
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((confirmed)=>{
      if(confirmed){
         this.authService.deleteUser(id).subscribe({
          next:(res)=>{
            this.authService.openSnackBar("User Deleted Successfully");
            this.getUserDetails();
          },
          error:(err)=>{
            console.log(err);
            
          }
         })
      }else{
        this.authService.openSnackBar("Delete action canceled", 'close')
      }
    })
  }
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
}
