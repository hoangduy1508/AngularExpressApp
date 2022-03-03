import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private Url = '/api/products';

  constructor(private http: HttpClient) { }


  getProducts(): Promise<void | any> {
    return this.http.get(this.Url)
      .toPromise()
      .then(response => response)
      .catch(this.error);
  }


  getProductById( id: number): Promise<void | any> {
    let url = this.Url  + "/" + id;
    return this.http.get(url)
      .toPromise()
      .then(response => response)
      .catch(this.error);
  }

  deleteProductById( id: number): Promise<void | any> {
    let url = this.Url  + "/" + id;
    return this.http.delete(url)
      .toPromise()
      .then(response => response)
      .catch(this.error);
  }

  // Error handling
  private error(error: any) {
    let message = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }
}
