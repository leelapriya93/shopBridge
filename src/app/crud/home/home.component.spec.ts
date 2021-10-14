import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CrudService } from '../crud.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '../product';

fdescribe('HomeComponent', () => {
  let crudService: CrudService;
  let httpMock: HttpTestingController;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ HttpClientTestingModule],
      providers: [
        CrudService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {params: {id: '1'}}
          }
        }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    crudService = TestBed.get(CrudService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should call ngOnInit`, () => {

      const products :Product[]= [
        {
          
          "id": 1,
          "title": "Laptop",
          "description": "laptop",
          "price": 10
        },
        {
          "id": 2,
          "title": "Bag",
          "description": "Cross over bag",
          "price": 20
        },
        {
          "id": 3,
          "title": "Book",
          "description": "Angular book",
          "price": 10
        }
      ];

      let spy = spyOn(crudService, "getAll").and.returnValue(of(products))
      component.ngOnInit();
      expect(component.products).toEqual(products)

    });


});
