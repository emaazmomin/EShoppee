import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { UserauthGuard } from './userauth.guard';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerMyProductsComponent } from './seller-my-products/seller-my-products.component';
import { SellerComponent } from './seller/seller.component';
import { UsersLoginComponent } from './users-login/users-login.component';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'seller',
    component: SellerComponent
  },
  {
    path: 'user-login',
    component: UsersLoginComponent
  },
  {
    path: 'sellerHome',
    component: SellerHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'seller-products',
    component: SellerMyProductsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'seller-dashboard',
    component: SellerDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'search/:val',
    component: SearchProductComponent
  },
  {
    path: 'details/:val',
    component: ProductDetailsComponent
  },
  {
    path: 'category/:val',
    component: CategoryComponent
  },
  {
    path: 'cart',
    component: CartComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
