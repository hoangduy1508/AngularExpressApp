import { Component, OnInit } from '@angular/core';

import { StatusService } from './shared/status.service';

import { ProductService } from './shared/product.service';

class ProductModel {
  id: number = 0;
  name: string = "";
  color: string = "";
  price: number = 0;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'node-express-angular';

  status = 'DOWN';

  products: ProductModel[] = [];

  constructor(
    private statusService: StatusService,
    private productService: ProductService
  ) {

  }

  ngOnInit(): void {
    this.statusService
      .getStatus()
      .then((result: any) => {
        this.status = result.status;
      });

    this.productService.getProducts().then((products: any) => {
      console.log(products);
      this.products = products;
    })
  }

  onDelete(id: number): void {
    this.productService.deleteProductById(id).then((products: any) => {
      this.productService.getProducts().then((products: any) => {
        console.log(products);
        this.products = products;
      })
    })
  }
}
