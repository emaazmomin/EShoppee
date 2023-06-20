import { Component, OnInit } from '@angular/core';
import { login, signup, uniqueEmail } from '../interface';
import { SellerService } from '../Service/seller.service';
import { Route, Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  login = true;
  lengthSatisfied = false;
  exist: boolean = false;
  invalid: boolean = false;
  emailalert: boolean = false;
  passalert: boolean = false;
  alert: boolean = false;
  constructor(private seller: SellerService, private router: Router, private http: HttpClient) { }
  ngOnInit(): void {
    //If page is refreshed or re visited after login then user will be redirected to the homepage and login is not required
    this.seller.reloadSeller();
  }

  //if email is already registered
  checkexistance(data: uniqueEmail) {
    this.seller.uniqueEmails(data).subscribe((result) => {
      if (result) {
        this.exist = true;
      }
      else {
        this.exist = false;
      }
    })
  }

  //registration
  signupData(data: signup) {
    //if email is not registered
    if (!this.exist) {
      this.seller.userSignup(data).subscribe((result) => {
        if (result) {
          this.login = true;
          this.alert = false;
        }
      });
    }
    //if email is already registered
    else {
      console.log("not registered");
      this.alert = true;
    }
  }

  //login
  loginData(data: login) {
    console.log(data.email);
    if (data.email && data.password) {
      this.seller.userLogin(data).subscribe((result) => {
        if (result) {
          this.seller.isLoggedin.next(true);
          localStorage.setItem('sellerLogs', JSON.stringify(data.email));
          this.router.navigate(['sellerHome']);
        }
        else {
          this.invalid = true;
        }
      })
    }
    else {
      if (!data.email) {
        this.emailalert = true;
      }
      if (!data.password) {
        this.passalert = true;
      }
    }
  }


  //when clicked on already registered
  showLogin() {
    this.login = true;
    this.alert = false;
  }

  //when clicked on not registered
  showSignup() {
    this.login = false;
  }

  //getting keyup events to calculate current length of input
  //input should be of min 8 characters 
  typing = false;
  keyUp(data: string) {
    this.typing = true;
    if (data.length >= 8) {
      this.lengthSatisfied = true;
    }
    else {
      this.lengthSatisfied = false;
    }
  }

  //when clciked on X button of alert bar
  ok() {
    this.alert = false;
    this.emailalert = false;
    this.passalert = false;
    this.invalid = false;
  }
}

