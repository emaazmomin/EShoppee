import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { product } from '../interface';
import { ProductsService } from '../Service/products.service';

@Component({
  selector: 'app-seller-my-products',
  templateUrl: './seller-my-products.component.html',
  styleUrls: ['./seller-my-products.component.css']
})
export class SellerMyProductsComponent implements OnInit {
  addproducts = false;
  updateproducts = false;
  listOfProducts: undefined | product[];
  updateThisItem: product;
  constructor(private getProducts: ProductsService) { }
  ngOnInit(): void {
    this.listproducts();
  }

  //calling get api to display product
  listproducts() {
    this.getProducts.productLists().subscribe((result) => {
      this.listOfProducts = result;
      // console.log(this.listOfProducts);
    })
  }


  //hiding add product button
  none = false;
  addproductbtn() {
    this.updateproducts = false;
    this.addproducts = true;
    this.none = true;
  }


  //adding product to json db
  added = false;
  addProds(data: product) {
    // sending data to prodcut service
    this.getProducts.AddProduct(data).subscribe((result) => {
      if (result) {
        console.log(result);
        this.added = true;
        setTimeout(() => {
          this.added = false;
        }, 4000);
      }
    });
    this.listproducts();
  }


  //updating products in json db
  updated = false;
  updateProds(data: product) {
    // console.log(data);
    // sending data to prodcut service
    this.getProducts.updateProduct(data).subscribe((result) => {
      if (result) {
        // console.log(result);
        this.updated = true;
        setTimeout(() => {
          this.updated = false;
        }, 4000);
      }
    });
    // updating product table without refreshing when product is added
    this.listproducts();
  }

  //deleting product from json db
  deleted = false;
  deleteItem(data: product) {
    this.getProducts.deleteProduct(data.pid).subscribe((result)=>{
      if(result){
        this.deleted = true;
        setTimeout(() => {
        this.deleted = false;
        }, 4000);
      }
    });
    //calling get api to update table after deleting product
    this.listproducts();
  }


  //when user click on update button of table
  updateItem(data: product) {
    //display form for updating
    this.updateproducts = true;
    this.addproducts = false;
    //hide add products button
    this.none = true;
    //pass data into inputs of update form
    this.updateThisItem = data;
  }
  //hiding update/add form after clicking on done button
  done() {
    this.none = false;
    this.updateproducts = false;
    this.addproducts = false;
  }

}
