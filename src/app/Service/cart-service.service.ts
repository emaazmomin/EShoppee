import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cart, product } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor(private http: HttpClient) { }
  basepath = "http://localhost/phptutorial/Angular_E_Com/Cart";

  addToCart(data: product) {
    return this.http.post(this.basepath + '/addcart.php', data);
  }

  checkProduct(id: string, pid: number, color: string, size: string) {
    return this.http.get(this.basepath + `/checkCart.php?user=${id}&pid=${pid}&color=${color}&size=${size}`);
  }

  getCart(uid: string) {
    return this.http.get<product[]>(this.basepath + `/getCart.php?user=${uid}`);
  }

  deleteItems(userCart:string,id: number) {
    return this.http.delete(this.basepath + `/deleteCart.php?tablename=${userCart}&id=${id}`);
  }

  cartproductdetails(input: number) {
    return this.http.get<product>(this.basepath + `/productsdata.php?id=${input}`);
  }
  // getCart(id:string){
  //   return this.http.get('http://localhost/phptutorial/Angular_E_Com/getcart.php');
  // }

  updateCart(data:any){
    return this.http.put(this.basepath+`/updateCart.php`,data);
  }
}
