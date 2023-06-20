import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { login, signup, uniqueEmail } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userLoggedin = new BehaviorSubject<boolean>(false);
  basepath = 'http://localhost/phptutorial/Angular_E_Com';
  constructor(private http: HttpClient, private route: Router) {}

  //User registration
  userSignup(data: signup) {
    // console.log(data);
    return this.http.post(this.basepath + '/userSignup.php', data);
  }

  //Checking if email already registered
  uniqueUser(data: uniqueEmail) {
    return this.http.post(this.basepath + '/uniqueemail.php', data);
  }

  //Logging user
  userLogin(data: login) {
    return this.http.post(this.basepath + '/userlogin.php', data);
  }

  //preventing users from logout after refreshing
  pageReload() {
    if (localStorage.getItem('users')) {
      this.userLoggedin.next(true);
      this.route.navigate(['']);
    }
  }
}
