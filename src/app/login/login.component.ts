import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // properties / variable declaration
  aim='your perfect'
  account='Enter Account Number Here'
  // hold user enter acno
  // acno=""

  // hold use pswd

  // pswd=""
  // loginForm

  loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  //database
  // userDetails:any={
  //   1000:{acno:1000,userName:'shafeel',password:1000,balance:5000},
  //   1001:{acno:1001,userName:'afra',password:1001,balance:8000},
  //   1002:{acno:1002,userName:'shan',password:1002,balance:52000}
  // }


  // constructor
  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }
  

  // life cycle hook-angular
  ngOnInit(): void {
  }
  

  //user defined function

  // acnoChange()
  // acnoChange(event:any){
  //   this.acno=event.target.value
  //   console.log( this.acno)

  // }

  // pswdChange()
  // pswdChange(event:any){
  //   this.pswd=event.target.value
  //   console.log(this.pswd)
  // }

  // login()
  login(){
    var acno=this.loginForm.value.acno
    var pswd=this.loginForm.value.pswd
    if(this.loginForm.valid){
      const result=this.ds.login(acno,pswd)
      .subscribe((result:any)=>{
          localStorage.setItem('currentName',JSON.stringify(result.currentName))
          localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
          localStorage.setItem('token',JSON.stringify(result.token))
          alert(result.message)
          this.router.navigateByUrl('dashboard')
        
      },result=>{
        alert(result.error.message)
       
      })
   
     
    }else{
      alert("Invalid Form")
    }
   

    
  // login(acno:any,pswd:any){
  //   var acno=acno.value
  //   var pswd=pswd.value
  //   let userDetails=this.userDetails

  //   if(acno in userDetails){
  //     if(pswd == userDetails[acno].password){
  //       alert("Login Successfully")
  //     }else{
  //       alert("Incorrect Password")
  //     }

  //   }else{
  //     alert("User Not Exists")
  //   }
  // }
}
}
