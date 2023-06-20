import { Component, OnInit } from '@angular/core';
import { SellerService } from './Service/seller.service';
import { UsersService } from './Service/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private reloadLogin:SellerService, private user:UsersService){}
  ngOnInit(): void {
    this.reloadLogin.reloadSeller();
    // this.user.pageReload();

  }
  title = 'E-Commerce_Angular_Web_App';
}
