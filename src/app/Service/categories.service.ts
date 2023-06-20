import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  basepath = "http://localhost/phptutorial/Angular_E_Com";

  constructor(private http:HttpClient) { }

  categories(){
    return this.http.get(this.basepath+'/category.php');
  }

  getCategoryOf(data:string){
  return this.http.get<product[]>(+this.basepath+`/category.php?category=${data}`);
  }
}
