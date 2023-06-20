import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../interface';
import { ProductsService } from '../Service/products.service';
import { CartServiceService } from '../Service/cart-service.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productDetails: product;
  noData: boolean;
  cartBtn = "Add to cart";
  added = false;
  qty: number = 1;
  loggedin = false;
  cartAdded = false;
  showAnim: boolean = false;
  online: boolean = true;
  requestSent = false;
  valuesSelected: boolean = false;
  notselected: boolean = false;
  pcolor: string ='';
  psize: string ='';

  // cartProduct:object | cart;

  alert = false;
  clrselected: boolean = false;
  sizeselected: boolean = false;

  pid: number;
  uid: string;
  color: string = '';
  size: string = '';
  colorAvailable: boolean = false;
  sizeAvailable: boolean = false;

  constructor(
    private activeroute: ActivatedRoute,
    private detail: ProductsService,
    private cart: CartServiceService,
    private cartqty: NavbarComponent,
    // private cartComp: CartComponent,
    private route: Router
  ) { }


  ngOnInit(): void {
    // window.addEventListener('online',this.networkStatus);
    //catching route event to check if user is logged in or not
    this.route.events.subscribe((result) => {
      this.pid = Number(this.activeroute.snapshot.paramMap.get('val'));
      if (localStorage.getItem('users')) {
        this.loggedin = true;
        this.uid = localStorage.getItem('users')+"cart";
        this.uid = this.uid.split('"').join('');
        this.checkProduct(this.uid, this.pid, this.color, this.size);
      }
      this.viewProduct(this.pid);
    })

  }
close(){
  this.alert = false;
  this.notselected = false;
}
  //To check whether the item is already in the cart
  checkProduct(uid: string, pid: number, color: string, size: string) {
    this.cart.checkProduct(uid, pid, color, size).subscribe((res) => {
      if (res === 1) {
        this.cartAdded = true;
      }
      else {
        this.cartAdded = false;
      }
    })
  }

  viewProduct(pid: number) {
    // console.log(this.valuesSelected);
    this.detail.details(pid).subscribe((res) => {
      if (res) {
        this.productDetails = res;
        if(localStorage.getItem('users')){
          this.checkProduct(this.uid, this.pid, this.productDetails.color, this.productDetails.color);
        }
        // console.log(this.productDetails)
        if (this.productDetails.color) {
          this.colorAvailable = true;
        }
        if (this.productDetails.size) {
          this.sizeAvailable = true;
        }
      }
      else {
        console.log("Unable to fetch product details");
      }
    })
  }

  //quantity button function
  Quantity(value: string) {
    if (value === 'plus') {
      this.qty = this.qty + 1;
    }
    if (value === 'minus' && this.qty > 1) {
      this.qty = this.qty - 1;
    }
  }


  selectValues(data: HTMLSelectElement) {
    if (data.id.includes('color')) {
      if (data.value != 'color') {
        this.color = data.value;
        this.pcolor = this.color;
      }
      else {
        this.pcolor = '';
        this.valuesSelected = false;
      }
    }
    if (data.id.includes('size')) {
      if (data.value != 'size') {
        this.size = data.value
        this.psize = this.size;
      }
      else {
        this.psize = '';
        this.valuesSelected = false;
      }
    }
    if (this.colorAvailable && this.pcolor != '') {
      this.valuesSelected = true;
    }
    if (this.sizeAvailable && this.psize != '') {
      this.valuesSelected = true;
    }
    if ((this.colorAvailable && this.sizeAvailable) && (this.pcolor == '' || this.psize == '')) {
      this.valuesSelected = false;
    }
//To check if the selected size or color of product is available in cart
    if(this.valuesSelected = true){
      this.checkProduct(this.uid, this.pid, this.pcolor, this.psize);
    }
  }



  //this function will decide where to add products
  //if user is logged in then the product is added to db else in local storage
  addtocart() {
    if (this.valuesSelected) {
      this.notselected = false;
      this.productDetails.quantity = this.qty;
      if (localStorage.getItem('users')) {
        let cartname = localStorage.getItem('users') + "cart";
        this.productDetails['cartname'] = cartname.split('"').join('')
        this.productDetails.size = this.psize;
        this.productDetails.color = this.pcolor;
        this.cart.addToCart(this.productDetails).subscribe((result) => {
          if (result) {
            this.cartAdded = true;
            this.alert = true;
            this.clrselected = false;
            this.sizeselected = false;
            this.cartqty.carnavqty();
          }
        });

      }
      else {
        let data = this.productDetails;
        let storage = localStorage.getItem('cart');
        let cartdata = [];
        if (!storage) {
          localStorage.setItem('cart', JSON.stringify([data]));
          this.cartAdded = true;
          this.alert = true;
          // this.cartqty.localcartqty();
        }
        else {
          cartdata = JSON.parse(storage);
          cartdata.push(data);
          localStorage.setItem('cart', JSON.stringify(cartdata));
          this.cartAdded = true;
          this.alert = true;
          // this.cartqty.localcartqty();
        }
      }
    }
    else {
      this.notselected = true;
    }
  }

  //if product is already in cart then the checkout btn will navigate to cart page
  checkoutcart() {
    this.route.navigate(['cart']);
  }





}
