import { Component, OnInit } from '@angular/core';

import { ProductService } from './shared/product.service';

import { FormControl, FormGroup } from '@angular/forms';

class ProductModel {
  id?: number = 0;
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

  formGroup: FormGroup;

  isEdit: boolean = false;

  editingProduct: ProductModel = null;

  constructor(
    private productService: ProductService
  ) {
    this.formGroup = this.generateFormGroup();
  }

  ngOnInit(): void {

    this.getProducts();
  }

  private getProducts() {
    this.productService.getProducts().then((products: any) => {
      this.products = products;
    })
  }

  onDelete(id: number): void {
    this.productService.deleteProductById(id).then((products: any) => {
      this.getProducts();
    })
  }

  onBeforeUpdate(item: ProductModel): void {
    this.isEdit = true;

    this.editingProduct = item;

    this.formGroup.get('name').setValue(item.name);

    this.formGroup.get('color').setValue(item.color);

    this.formGroup.get('price').setValue(item.price);

  }

  onUpdate(): void {
    let updateProduct = new ProductModel();

    updateProduct.id = this.editingProduct.id;

    updateProduct.name = this.formGroup.get('name').value;

    updateProduct.color = this.formGroup.get('color').value;

    updateProduct.price = this.formGroup.get('price').value;

    this.productService.updateProductById(updateProduct).then((products: any) => {
      this.getProducts();

      this.resetForm();

      this.isEdit = false;

      this.editingProduct = null;
    })

  }

  submitProduct() {
    let newProduct = new ProductModel();

    newProduct.name = this.formGroup.get('name').value;

    newProduct.color = this.formGroup.get('color').value;

    newProduct.price = this.formGroup.get('price').value;

    this.productService.createProduct(newProduct).then((products: any) => {
      this.getProducts();
      this.resetForm();
    })
  }

  private resetForm() {
    this.formGroup.get('name').setValue('');
    this.formGroup.get('color').setValue('');
    this.formGroup.get('price').setValue(0);
  }

  private generateFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      color: new FormControl(''),
      price: new FormControl(0),
    })
  }
}
