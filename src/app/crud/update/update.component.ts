import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  productForm: FormGroup;
  productId: any;
  product : any;
  constructor(public fb: FormBuilder,
    private router: Router,
    public crudService: CrudService,
    private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: [''],
      description: [''],
      price: ['']   
    })
    this.activatedRoute.params.subscribe( data =>{
      this.productId = data.productId;
      })
      this.crudService.getById(this.productId)
      .pipe(first())
      .subscribe(x => {
        this.productForm.patchValue(x)});
  }
  EditProduct(id) {
    this.crudService.update(id ,this.productForm.value).subscribe(res => {
      console.log('Product created!')
    })
  
  }
}
