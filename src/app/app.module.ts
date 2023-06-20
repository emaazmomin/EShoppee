import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { FormsModule } from "@angular/forms";
import {  HttpClientModule } from '@angular/common/http';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerMyProductsComponent } from './seller-my-products/seller-my-products.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UsersLoginComponent } from './users-login/users-login.component';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SellerComponent,
    SellerHomeComponent,
    SellerMyProductsComponent,
    SellerDashboardComponent,
    SearchProductComponent,
    ProductDetailsComponent,
    UsersLoginComponent,
    CartComponent,
    CategoryComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
