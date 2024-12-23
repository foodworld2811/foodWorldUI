import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private _fb:FormBuilder,private _auth:AuthService,private _route:Router){}
  
  ngOnInit(){
    this.registerForm = this._fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
    })
  }

  get firstname(){
    return this.registerForm.get('firstname')
  }

  get lastname(){
    return this.registerForm.get('lastname');

  }

  get email(){
    return this.registerForm.get('email');
  }
  get password(){
    return this.registerForm.get('password')
  }
  onSubmit(){
    if(this.registerForm.valid){
      this._auth.addUser(this.registerForm.value).subscribe({
        next:(res)=>{
          this._auth.openSnackBar("Registration Successfully","Done");
          this._route.navigate(['/login'])
        },
        error:console.log
      })
    }
  }
}
