import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './Service/users.service';

@Injectable({
  providedIn: 'root'
})
export class UserauthGuard implements CanActivate {
  constructor(private logs : UsersService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.logs.userLoggedin;
  }
  
}
