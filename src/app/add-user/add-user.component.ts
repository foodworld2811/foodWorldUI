import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm!:FormGroup;
constructor(private _dialogRef:MatDialogRef<AddUserComponent>,private fb:FormBuilder){}

ngOnInit(){
  this.userForm = this.fb.group({
    firstname:['',Validators.required],
    lastname:['',Validators.required],
    contact:['',Validators.required],
    address:['',Validators.required],
    username:['',Validators.required],
    password:['',Validators.required]
  })
}

onSubmit(){}
}
