import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signup, uniqueEmail } from "src/app/interface";
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isLoggedin = new BehaviorSubject<boolean>(false);
  basepath = 'http://localhost/phptutorial/Angular_E_Com';
  constructor(private http: HttpClient, private route: Router) {
  }


  userSignup(data: signup) {
     return this.http.post(this.basepath+'/sellerSignup.php', data, { observe: 'response' })
    //  .subscribe((result) => {
      // localStorage.setItem('sellerLogs', JSON.stringify(result.body));
      // this.isLoggedin.next(true);
      // this.route.navigate(['sellerHome']);
    //   console.log(result);
    // });
  }

  userLogin(data:login){
    return this.http.post(this.basepath+'/sellerLogin.php',data);
  }

  uniqueEmails(data:uniqueEmail){
    return this.http.post(+this.basepath+'/uniqueemailSeller.php',data);
  }


  reloadSeller() {
    if (localStorage.getItem('sellerLogs')) {
      this.isLoggedin.next(true);
      this.route.navigate(['sellerHome']);
    }
  }
}
