import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'user/:username',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'user-details',component:UserDetailsComponent},
  {path:'home',
    component:HomeComponent,
    canActivate:[AuthGuard] 
  },
  {path:'home/:category',component:SubCategoriesComponent},
  {path:'cart',component:CartComponent,canActivate:[AuthGuard]},
  {path:'',redirectTo:'/login',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
