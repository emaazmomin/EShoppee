import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Service/products.service';
import { ActivatedRoute } from '@angular/router';
import { product } from '../interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {
  constructor(private activeroute: ActivatedRoute, private display: ProductsService, private route: Router) { }
  products: undefined | product;
  showAnim = true;
  response: boolean = true;
  ngOnInit(): void {
    //getting url value
    this.activeroute.params.subscribe((result) => {
      let query = result['val'];
      if (query != '') {
        //getting products after passing data to search product service
        this.display.searchProducts(query).subscribe((result) => {
          if (result) {
            //displaying result in the products variable
            this.products = result;
            this.showAnim = false;
            this.response = true;
            // console.log(result);
          }
          else {
            setTimeout(() => {
              this.response = false;
              this.showAnim = false;
            }, 5000);
          }
        })
      }
    })
  }
}
