import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { AddUserComponent } from './add-user/add-user.component';
import { CategoryComponent } from './category/category.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { RouterModule } from '@angular/router';
import { AddSubCategoriesComponent } from './add-sub-categories/add-sub-categories.component';
import { CartComponent } from './cart/cart.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MaterialModule } from './material/material.module';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    AddUserComponent,
    CategoryComponent,
    UserDetailsComponent,
    ConfirmDialogComponent,
    SubCategoriesComponent,
    AddSubCategoriesComponent,
    CartComponent,
    ViewOrdersComponent,
    WelcomePageComponent,
    SpinnerComponent,
    OrderDetailsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
