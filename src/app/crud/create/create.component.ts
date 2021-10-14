import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  productForm: FormGroup;

  constructor(public fb: FormBuilder,
    public crudService: CrudService) { }

  ngOnInit() {
    this.productForm = this.fb.group({
    title: ['',Validators.required],
    description: ['',Validators.required],
    price: ['',Validators.required],
    quantity: ['',Validators.required],    
  })
}
  submitForm() {
    this.crudService.create(this.productForm.value).subscribe(res => {
      console.log('Product created!')
    })
  }
  get title() { return this.productForm.get('title'); }
  get description() { return this.productForm.get('description'); }
  get price() { return this.productForm.get('price'); }

}
