import { Component, OnInit } from '@angular/core';
import { cart, product } from '../interface';
import { CartServiceService } from '../Service/cart-service.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  Cartproducts: product[] | undefined;
  total = 0;
  emptyCart: boolean= false;
  cartTable: string;
  quantity: number;
  updated: boolean = false;
  failed: boolean = false;
  // userTable:string;
  constructor(private items: CartServiceService, private cartqty: NavbarComponent) { }
  ngOnInit(): void {
    if (localStorage.getItem('users')) {
      this.cartTable = localStorage.getItem('users') + "cart";
      this.cartTable = this.cartTable.split('"').join('');
    }
    this.cart()
  }

  close() {
    this.updated = false;
    this.failed = false;
    // this.connection = false;
  }

  //quantity update button function
  Quantity(value: string, data: any) {
    if (value === 'plus') {
      data['tname'] = this.cartTable;
      data.quantity = String(Number(data.quantity) + 1);
      this.items.updateCart(data).subscribe((res) => {
        if (res) {
          console.log("updated");
          this.cart();
          this.updated = true;
        }
        else {
          this.failed = true;
        }
      })

    }
    if (value === 'minus' && data.quantity > 1) {
      data.quantity = String(Number(data.quantity) - 1);
      this.items.updateCart(data).subscribe((res) => {
        if (res) {
          console.log("updated");
          this.cart();
          this.updated = true;
        }
        else {
          this.failed = true;
        }
      })
    }
  }

  // totalPrice(data: | product[] | undefined) {
  //   data.forEach(element => {
  //     let pp = element.price.toString().split(',').join('');
  //     this.total += element.quantity * Number(pp);
  //   })

  // }


  //get cart items
  cart() {
    this.items.getCart(this.cartTable)
      .subscribe((res) => {
        if (res) {
          // console.log(res.length);
          this.Cartproducts = res;
          this.emptyCart = false;
          this.cartqty.cartQty = res.length;
          // console.log(this.Cartproducts);
        }
        else {
          console.log("No products");
          this.emptyCart = true;
          this.cartqty.cartQty = 0;
        }
      })
  }


  deleteItem(data: any) {
    if (localStorage.getItem('users')) {
      this.items.deleteItems(this.cartTable, Number(data.sno)).subscribe((result) => {
        if (result) {
          this.total = 0;
          this.cart();
          // this.cartqty.carnavqty();
        }
        else {
          console.log("Unable to delete");
        }
      })
    }
    //   else {
    //     let items = localStorage.getItem('cart');
    //     let itemObj = JSON.parse(items);
    //     let index = this.Cart.indexOf(data);
    //     itemObj.splice(index, 1);
    //     localStorage.setItem('cart', JSON.stringify(itemObj));
    //     this.cartqty.localcartqty();
    //     this.cart();
    //     this.total = 0;
    //   }
  }
}
