import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoriesService } from '../Service/categories.service';
import { product } from '../interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
constructor(private route:ActivatedRoute,private category:CategoriesService){}
categoryProducts:product[]|undefined;
ngOnInit(): void {
  // this.getProducts();
  this.route.params.subscribe((result)=>{
    // console.log(result);
    if(result){
      let catname = result['val'];
      // console.log("route",result['val']);
      catname && this.category.getCategoryOf(catname).subscribe((result)=>{
        // console.log(result);
        if(result){
          this.categoryProducts = result;
        }
      })
    }
  })
}

}
