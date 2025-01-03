import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  userdata: any;
  isAdminLoggedIn = false;
  isLoading: boolean = false;
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

  get Username() {
    return this.loginForm.get('username');
  }

  get Password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      if (this.loginForm.value.username === 'admin123' && this.loginForm.value.password === 'Admin@2810') {
        console.log("checking admin details");
        this.isAdminLoggedIn = true;
        sessionStorage.setItem('username', this.loginForm.value.username);
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        this._auth.openSnackBar("Admin Login Successfully");
        this.router.navigate(['/welcome']).then(() => {
          window.location.reload();
        });
      } else{
        console.log("checking user details");
        this._auth.Islogged(this.loginForm.value).subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res) {
              this.userdata = res;
                sessionStorage.setItem('username', this.loginForm.value.username);
                this._auth.openSnackBar("Logged In Successfully");
                this.router.navigate(['/welcome']).then(() => {
                  window.location.reload();
                });
            } else {
              this._auth.openSnackBar("Invalid Credentials", "Try Again");
            }
          },
          error: (err) => {
            this.isLoading = false;
            if (err.status === 401) {
              this._auth.openSnackBar("Invalid Credentials", "Try Again");
            } else {
              console.error(err);
              this._auth.openSnackBar("An error occurred", "Please try again later");
            }
          }
        });
      }
      }
       else {
      this._auth.openSnackBar("Please fill in all required fields", "Try Again");
    }
  }
  
}
