import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm!:FormGroup;
constructor(private _dialogRef:MatDialogRef<AddUserComponent>,
  private fb:FormBuilder, private authService:AuthService,
@Inject(MAT_DIALOG_DATA) public data:any){}

ngOnInit(){
  this.userForm = this.fb.group({
    firstname:['',[Validators.required,Validators.pattern(/^[A-Za-z]{3,}$/)]],
    lastname:['',[Validators.required,Validators.pattern(/^[A-Za-z]{3,}$/)]],
    contact:['',[Validators.required,Validators.pattern(/^[6-9]{1}[0-9]{9}$/)]],
    address:['',Validators.required],
    username:['',[Validators.required,Validators.minLength(8)]],
    password:['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-zd@$!%*?&].{8,}$/)]]
  })

  this.userForm.patchValue(this.data)
}
 
onSubmit(){
  if(this.userForm.valid){
    if(this.data){
      this.authService.updateUserDetails(this.data.id,this.userForm.value).subscribe({
        next:(val)=>{
          this.authService.openSnackBar("User Updated Successfully");
          this._dialogRef.close(true)
        },
        error:(err)=>{
          console.log(err);
          
        }
      })

    }else{
      this.authService.addUser(this.userForm.value).subscribe({
        next:(res)=>{
          if(res){
            this.authService.openSnackBar("User Added Successfully");
            this._dialogRef.close(true);
          }
        },
        error:(err)=>{
          console.log(err);
          this.authService.openSnackBar("Invalid User Details","Try Again")
          
        }        
      })
    }
   
  }
}
}
