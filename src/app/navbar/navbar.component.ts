import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { category, product } from '../interface';
import { ProductsService } from '../Service/products.service';
import { SellerService } from '../Service/seller.service';
import { UsersService } from '../Service/users.service';
import { CartServiceService } from '../Service/cart-service.service';
import { CategoriesService } from '../Service/categories.service';
import { CategoryComponent } from '../category/category.component';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchList: undefined | product[];
  cartQty = 0;
  localcartQty = 0;
  SellerLoggedin = false;
  userLoggedin = false;
  categories: any;
  screenwidth: number;
  constructor(private route: Router, private searchService: ProductsService, private users: UsersService, private cartqty: CartServiceService, private category: CategoriesService) { }

  ngOnInit(): void {
    this.localcartqty();
    this.catlists();
    //to capture screen width
    this.screenwidth = window.innerWidth;

    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('sellerLogs') && val.url.includes('seller')) {
          // console.log('Seller Logged in');
          this.SellerLoggedin = true;
        }
        if (localStorage.getItem('users') && val.url.includes('/')) {
          this.userLoggedin = true;
        }
      }
    })

  }
  catlists() {
    this.category.categories().subscribe((result) => {
      this.categories = result;
    })
  }


  // //cart quantity display from server
  carnavqty() {
    if (localStorage.getItem('users')) {
      let uname = localStorage.getItem('users') + "cart";
      let usercart = uname.split('"').join('');
      this.cartqty.getCart(usercart).subscribe((result) => {
        if (result) {
          // console.log(result.length);
          // console.log(result);
          this.cartQty = result.length;
        }
      })
    }

  }

  //cart quantity display from localstorage
  localcartqty() {
    let localcartdata = localStorage.getItem('cart');
    if (localcartdata) {
      let cartlength = JSON.parse(localcartdata);
      this.localcartQty = cartlength.length;

    }
  }



  logout(value: string) {
    if (value === 'seller') {
      localStorage.removeItem('sellerLogs');
      this.SellerLoggedin = false;
      this.route.navigate(['']);
      if (this.screenwidth <= 1012) {
        const menuBtn = document.querySelector(".burger");
        const menu = document.querySelector(".menu");
        menu.classList.remove("active");
        menuBtn.classList.remove("open");
      }
    }
    if (value === 'user') {
      localStorage.removeItem('users');
      this.userLoggedin = false
      this.route.navigate(['']);
      if (this.screenwidth <= 1012) {
        const menuBtn = document.querySelector(".burger");
        const menu = document.querySelector(".menu");
        menu.classList.remove("active");
        menuBtn.classList.remove("open");
      }

    }
  }

  search = false;
  inp: HTMLInputElement;
  //handling keyup event and sending the key values to the api to get suggestions
  searchSuggestion(data: KeyboardEvent) {
    //storing input tag in this.input
    this.inp = data.target as HTMLInputElement;
    // console.log(this.inp.value);
    if (data) {
      let element = data.target as HTMLInputElement;
      this.search = true;
      this.searchService.searchSugestion(element.value).subscribe((result) => {
        if (result) {
          // if (result.length > 5) {
          //   result.length = 5;
          // }
          this.searchList = result;
        }
        else{
          console.log("no products");
        }
      });
      if (element.value === '') {
        this.search = false;
      }
    }
  }

  // searching items by clicking on suggestions
  suggestedsearch(suggestion:HTMLSelectElement){
    // console.log(suggestion.value);
    this.route.navigate([`/search/${suggestion.value}`]);
    this.search = false;
  }

  //when clicked on search button
  searchProduct(input: string) {
    this.route.navigate([`/search/${input}`]);
  }



  //blur event to hide search suggestions after clicking outside the input bar
  hideSuggestion(data: any) {
    // console.log("blur");
    setTimeout(() => {
      this.search = false;
    }, 200);
  }



  burgerMenu(data: any) {
    const menuBtn = document.querySelector(".burger");
    const menu = document.querySelector(".menu");
    menu.classList.toggle("active");
    menuBtn.classList.toggle("open");
  }

  //to get the live screen width as it changes
  @HostListener('window:resize', ['event'])
  onresize() {
    // console.log("size function running")
    this.screenwidth = window.innerWidth;
  }

  clicked(val: any) {
    console.log(val.value);
    if (val.value && val.value != 'Categories') {
      // console.log(val)
      this.route.navigate([`category/${val.value}`]);
      if (this.screenwidth <= 1012) {
        const menuBtn = document.querySelector(".burger");
        const menu = document.querySelector(".menu");
        menu.classList.remove("active");
        menuBtn.classList.remove("open");
      }
    }
    val.value = 'Categories';
  }

  active(data: any) {
    // console.log(data.target);
    data.target.classList.toggle('active');
  }


  //functons to hide the navbar when clciked on nav menu list
  navHome() {
    // console.log("home");
    // console.log(this.screenwidth);
    if (this.screenwidth <= 1012) {
      const menuBtn = document.querySelector(".burger");
      const menu = document.querySelector(".menu");
      menu.classList.remove("active");
      menuBtn.classList.remove("open");
    }
  }
  navCart() {
    // console.log("Cart");
    if (this.screenwidth <= 1012) {
      const menuBtn = document.querySelector(".burger");
      const menu = document.querySelector(".menu");
      menu.classList.remove("active");
      menuBtn.classList.remove("open");
    }
  }
  navMyorders() {
    // console.log("My Orders");
    if (this.screenwidth <= 1012) {
      const menuBtn = document.querySelector(".burger");
      const menu = document.querySelector(".menu");
      menu.classList.remove("active");
      menuBtn.classList.remove("open");
    }
  }

  navuserLogin() {
    if (this.screenwidth <= 1012) {
      const menuBtn = document.querySelector(".burger");
      const menu = document.querySelector(".menu");
      menu.classList.remove("active");
      menuBtn.classList.remove("open");
    }
  }
  navSeller() {
    if (this.screenwidth <= 1012) {
      const menuBtn = document.querySelector(".burger");
      const menu = document.querySelector(".menu");
      menu.classList.remove("active");
      menuBtn.classList.remove("open");
    }
  }
  navDash() {
    if (this.screenwidth <= 1012) {
      const menuBtn = document.querySelector(".burger");
      const menu = document.querySelector(".menu");
      menu.classList.remove("active");
      menuBtn.classList.remove("open");
    }
  }
  navMyprods() {
    if (this.screenwidth <= 1012) {
      const menuBtn = document.querySelector(".burger");
      const menu = document.querySelector(".menu");
      menu.classList.remove("active");
      menuBtn.classList.remove("open");
    }
  }
}
