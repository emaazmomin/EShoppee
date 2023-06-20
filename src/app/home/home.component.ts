import { Component, Input, OnInit } from '@angular/core';
import { product } from '../interface';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductsService } from '../Service/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  constructor(private displayproducts: ProductsService,private cart:NavbarComponent) { }
  popularProducts: undefined | product[];
  products: undefined | product[];
  cartProducts : undefined | product[];
  name:string;
  showAnim:boolean = true;
  ngOnInit(): void {
    // this.cart.carnavqty();
    this.displayproducts.popularProducts().subscribe((data) => {
      // console.log(data);
      this.popularProducts = data;
      // console.log(this.popularProducts[0].url);
    });

    this.displayproducts.productLists().subscribe((data)=>{
      if(data){
        this.products = data;
        // console.log(data)
        this.showAnim = false;
      }
      // console.log(data);
    })
  }
}




