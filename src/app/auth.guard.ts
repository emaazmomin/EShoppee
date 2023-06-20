import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NavbarComponent } from './navbar/navbar.component';
import { SellerService } from './Service/seller.service';
// import { SellerService } from './Service/seller.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private seller:SellerService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //if isloggedin is true then seller is redirected to seller home
    return this.seller.isLoggedin;
  }
  
}
