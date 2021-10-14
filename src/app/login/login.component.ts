import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CrudService } from '../crud/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  constructor( private formBuilder : FormBuilder, private service : CrudService, private router : Router) { }
  loginMessage : string = "";
  loginForm : FormGroup;
  ngOnInit() {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('loggedUsername');
    localStorage.setItem('login','no');
    this.loginForm = this.formBuilder.group({
      'uname' : ['', Validators.required],
      'pwd' : ['', Validators.required]
    })
  }
  userLogin(){
    var username = this.loginForm.value.uname;
    var password = this.loginForm.value.pwd;
    this.service.getAllUsernames().subscribe(res=>{
      console.log(res)
      
        if(res[0].userName==username && res[0].password == password){
          localStorage.setItem('loggedUser',res[0].firstName);
          localStorage.setItem('login','yes');
          localStorage.setItem('loggedUsername',res[0].userName);
        }
      
      if(localStorage.getItem('login')=="no"){
        this.loginMessage = "Invalid username / password";
      }
      else{
        this.router.navigateByUrl('/crud/home');
      }
    })
  }
}
