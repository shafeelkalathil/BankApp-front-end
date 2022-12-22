import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { TransactionComponent } from './../transaction/transaction.component';
import { Injectable } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

// global header
let options={
  headers:new HttpHeaders()
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
    
  constructor(private http:HttpClient) {
    
   }

  // register

  register(acno:any,userName:any,password:any){
    const data={
      acno,
      userName,
      password
    }
    // register api
    return this.http.post('http://localhost:3000/register',data)
}
  // login()
  login(acno:any,pswd:any){
   
    const data={
      acno,
      pswd
    }
    // login api
    return this.http.post('http://localhost:3000/login',data)
   
  }

  // to get token and attach its request header
  getOptions(){
    // fetch the token from local storage
   const token=JSON.parse(localStorage.getItem('token')||'')
  //  to get the header .create an object for HttpHeaders
  let headers=new HttpHeaders()
  // append token inside headers
  if(token){

     headers=headers.append('x-access-token',token)
    //  implementing overloaded
    options.headers=headers
  }
  return options
}

  // deposit()

  deposit(acno:any,pswd:any,amt:any){
    
       const data={
        acno,
        pswd,
        amt
       }

      //  deposit api 

      return this.http.post('http://localhost:3000/deposit',data,this.getOptions())

  }

  // withdraw()

  withdraw(acno1:any,pswd1:any,amt1:any){
    const data={
      acno1,
      pswd1,
      amt1
    }
    return this.http.post('http://localhost:3000/withdraw',data,this.getOptions())
  }
  // transaction

  getTransaction(acno:any){
    const data={
      acno
    }
   return this.http.post('http://localhost:3000/transaction',data,this.getOptions())
  }

  // delete APi

  delete(acno:any){

   return this.http.delete('http://localhost:3000/delete/'+acno)
  }
}
