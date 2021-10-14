import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

import {  Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Product } from './product';
import * as ProductsApi from '../products.json'
import * as UsersAvailable from '../../assets/users.json'
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiServer = "https://fakestoreapi.com";
  private users = UsersAvailable;
  private _producturl='../products.json';
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  productId: any;
  getAllUsers : any= [];

  constructor(private http: HttpClient , private activatedRoute:ActivatedRoute) { 
    
  }
 
  create(product : any): Observable<Product> {
    return this.http.post<Product>(this.apiServer + '/products/', JSON.stringify(product), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  getById(id : any): Observable<Product> {
    return this.http.get<Product>(this.apiServer  + '/products/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiServer + '/products/')
    .pipe(
      catchError(this.errorHandler)
    )
  }
  update(id : any, product : any): Observable<Product> {
    return this.http.put<Product>(this.apiServer + '/products/' + id, JSON.stringify(product), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id : any){
    return this.http.delete<Product>(this.apiServer + '/products/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getAllUsernames(){
    this.getAllUsers = this.http.get('../../assets/users.json')
    console.log(this.getAllUsers )
    return this.getAllUsers 
}
public getUsersJsonData(filePath: string){
  return this.http.get(filePath);
}
//registerUsers
registerUsers(registerUserObj : any){
  return this.http.post('../../assets/users.json', registerUserObj ,this.httpOptions).subscribe((res:Response)=>{
      
      console.log(res);
      return res.json(); 
  });
}
  errorHandler(error : any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
