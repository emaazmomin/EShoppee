import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // private products =
  //   'http://localhost/phptutorial/Angular_E_Com/productsdata.php';
  constructor(private http: HttpClient, private route: Router) {}
  basepath = 'http://localhost/phptutorial/Angular_E_Com';

  //adding new products
  // added = false;
  AddProduct(data: product) {
    //posting data to json
    return this.http.post('http://localhost:3000/productsData', data);
    // return this.http.post('http://localhost:3000/productsData',data);
  }

  //updating data
  updateProduct(data: product) {
    //posting data to json
    return this.http.put<product>(
      `http://localhost:3000/productsData/${data.pid}`,
      data
    );
  }

  //displaying data
  // productLists(){
  //  return this.http.get<product[]>('http://localhost:3000/productsData');
  // }

  //displaying data USING PHP
  productLists() {
    return this.http.get<product[]>(this.basepath+`/productsData.php`);
  }

  popularProducts() {
    return this.http.get<product[]>(this.basepath+`/productsData.php`);
  }

  deleteProduct(data: number) {
    return this.http.delete(this.basepath + `/${data}`);
  }

  // see suggestions for input USING PHP
  searchSugestion(input: string) {
    return this.http.get<product[]>(
      this.basepath + `/productsdata.php?term=${input}`
    );
  }

  //search the products
  searchProducts(input: string) {
    // return this.http.get<product>(`https://e-shoppee.000webhostapp.com/productsdata.php?name=${input}`);
    return this.http.get<product>(
      this.basepath + `/productsdata.php?pname=${input}`
    );
  }

  //details of products
  details(input: number) {
    return this.http.get<product>(
      this.basepath + `/productdetails.php?pid=${input}`
    );
  }
}
