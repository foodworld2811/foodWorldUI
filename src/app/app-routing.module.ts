import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { StartersComponent } from './starters/starters.component';
import { BiryanisComponent } from './biryanis/biryanis.component';
import { DessertsComponent } from './desserts/desserts.component';
import { BeveragesComponent } from './beverages/beverages.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'user/:email',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'admin',component:AdminDashboardComponent},
  {path:'starters',component:StartersComponent},
  {path:'biryanis',component:BiryanisComponent},
  {path:'desserts',component:DessertsComponent},
  {path:'beverages',component:BeveragesComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
