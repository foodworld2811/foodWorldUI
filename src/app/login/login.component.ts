import {  Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  userdata: any;
  isAdminLoggedIn= false;
  constructor(private fb: FormBuilder, private router: Router,
     private _auth: AuthService) {
    sessionStorage.clear();
    localStorage.clear();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  // validemail(){

  // }
  get Username() {
    return this.loginForm.get('username');
  }

  get Password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid) {
      this._auth.Islogged(this.loginForm.value.username).subscribe({
        next: (res) => {
          this.userdata = res;
          console.log(this.userdata[0].username);

          // console.log(this.userdata); 
          if (this.userdata[0].username === 'admin123') {
            if (this.userdata[0].password === this.loginForm.value.password) {
              this.isAdminLoggedIn = true;
              sessionStorage.setItem('username', this.loginForm.value.username);
              sessionStorage.setItem('isAdminLoggedIn','true')
              this._auth.openSnackBar("Admin Login Successfully")
              this.router.navigate(['/welcome']).then(() => {
                window.location.reload(); })

            } else {
              this._auth.openSnackBar("Check admin Credentials")
            }
          }
          else if (this.userdata[0].password === this.loginForm.value.password) {
            sessionStorage.setItem('username', this.loginForm.value.username);
            this._auth.openSnackBar("Logged In Successfully");
            this.router.navigate(['/welcome']).then(() => {
              window.location.reload(); })

          } else {
            this._auth.openSnackBar("Wrong Password Try Again")
          }
        }

      }
      )
    }
  }
}
