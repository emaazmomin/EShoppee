import { Component, OnInit } from '@angular/core';
import { login, signup, uniqueEmail } from '../interface';
import { UsersService } from '../Service/users.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-users-login',
  templateUrl: './users-login.component.html',
  styleUrls: ['./users-login.component.css']
})
export class UsersLoginComponent implements OnInit {
  login = true;
  verified = true;
  isActive: boolean = false;
  show: boolean = false;
  registered: boolean = false;
  warning: boolean = false;
  regError: boolean = false;


  constructor(private userservice: UsersService, private route: Router) { }

  ngOnInit(): void {
    this.userservice.pageReload();
  }
  signupData(details: signup) {
    // console.log(details);
    this.userservice.userSignup(details).subscribe((result) => {
      console.log(result);
      if (result) {
        this.login = true;
        this.registered = true;
      }
      else {
        this.regError = true;
      }
    });

  }

  //User login with authentication
  loginData(details: login) {
    this.userservice.userLogin(details).subscribe((result) => {
      if (result) {
        this.verified = true;
        this.userservice.userLoggedin.next(true);
        //storing email to the local storge so that is the page is reloaded then user will be logged in
        localStorage.setItem('users', JSON.stringify(details.email));
        this.route.navigate(['/']);
      }
      else {
        this.verified = false;
        this.isActive = true;
      }
    });
  }

  verify() {
    this.verified = true;
    this.isActive = false;
  }
  registeredDone() {
    this.registered = false;
  }

  showLogin() {
    this.login = true;
  }
  showSignup() {
    this.login = false;
  }
  getKey(data: uniqueEmail) {
    // console.log(data);
    this.userservice.uniqueUser(data).subscribe((result) => {
      if (result) {
        this.show = true;
      }
      else {
        this.show = false;
      }
    })
  }
  reset() {
    this.warning = false;
  }
}
