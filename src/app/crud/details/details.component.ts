import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  productId: any;
  product : any;

  constructor( private service : CrudService ,private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( data =>{
      this.productId = data.productId;
      })
      this.service.getById(this.productId).subscribe(res => {
        this.product = res;
      })
  }
}
