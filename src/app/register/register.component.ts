import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../crud/crud.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder : FormBuilder , private service : CrudService) { }
  @ViewChild('regForm')
  public registerCompForm : NgForm;

  registerForm : FormGroup;
  regMessage : string = '';
  isUsernameExists : boolean = false;
  allusers ;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fname : ['', Validators.required],
      lname : ['', Validators.required],
      uname : ['', Validators.required],
      pwd :   ['',[Validators.required,Validators.minLength(8),Validators.pattern('^[A-Z][a-zA-Z0-9]*$')]],
      mobile : ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("^[6-9][0-9]*$")]],
      email : ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9]*@[a-z]*.[a-z]*$')]]
    })
  }
  validateUsername() {
    //allusers = this.service.getAllUsernames()
    this.service.getUsersJsonData('../../assets/users.json').subscribe(data => {
      console.log(data)
      data[0].userName
      this.allusers = data as string[];  
      if(this.allusers){
        this.allusers.forEach(ele =>{
          console.log(ele)
          if(ele.userName == this.registerForm.value.uname){
            console.log("I found it");
            this.isUsernameExists = true;
          }
        })
      }       //Reading JSON Data
}); 
  
  }

  registerUser(){
    var firstName = this.registerForm.value.fname;
    var lastName = this.registerForm.value.lname;
    var userName = this.registerForm.value.uname;
    var mobileNumber = this.registerForm.value.mobile;
    var emailAddress = this.registerForm.value.email;
    var password = this.registerForm.value.pwd;
    this.validateUsername()
      if(!this.isUsernameExists){
        var registerUserObj = {
          'firstName' : firstName,
          'lastName' : lastName,
          'userName' : userName,
          'password' : password,
          'mobileNumber' : mobileNumber,
          'emailAddress' : emailAddress
        }
        this.service.registerUsers(registerUserObj);
        this.regMessage = "Registered successfully"
      }
      else{
        this.regMessage = "UserName already exists. Try again."
      }
    }
    //);
  }

    // validateUsername() : Promise<boolean>{
    //   return new Promise<boolean>(resolve => {
    //     var isUsernameExists = false;
    //     this.service.getAllUsernames().then(res=>{
    //       console.log(res);
    //       res.forEach(ele =>{
    //         if(ele.userName == this.registerForm.value.uname){
    //           console.log("I found it");
    //           isUsernameExists = true;
    //         }
    //       })
    //       resolve(!isUsernameExists);
    //     });
    //   });
    // }

