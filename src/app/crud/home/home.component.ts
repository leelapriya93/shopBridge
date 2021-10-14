import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { Product } from '../product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
   displayedColumns : string[] =[];
   dataSource : Product[] =[];
   private sorted = false;
  constructor(public crudService: CrudService) { }

  ngOnInit() : void {

    this.crudService.getAll().subscribe((data: Product[])=>{
      this.products = data;
      this.dataSource  = data;
    });  

    this.displayedColumns = ['id', 'title', 'description', 'price'];
}
  deleteProduct(id : any){
    this.crudService.delete(id)
  }
  sortBy(by: string | any): void {

    this.products.sort((a: any, b: any) => {
      if (a[by] < b[by]) {
        return this.sorted ? 1 : -1;
      }
      if (a[by] > b[by]) {
        return this.sorted ? -1 : 1;
      }

      return 0;
    });

    this.sorted = !this.sorted;
  }
}
