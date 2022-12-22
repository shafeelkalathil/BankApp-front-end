import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { empty } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // acno=""
  // pswd=""
  // amount=""

  // acno1=""
  // pswd1=""
  // amount1=""

  user=""

  depositForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

  withdrawForm=this.fb.group({
    acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd1:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount1:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })
  // deleted acno

  acno:any

  lDate:any
  
  constructor(private ds:DataService,private fb:FormBuilder,private router:Router) {
    // fetch username from localstorage 
    if(localStorage.getItem('currentName')){

      this.user=JSON.parse(localStorage.getItem('currentName') || '')
    }
    this.lDate=new Date()
  }

  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      alert("Please Login ")
      this.router.navigateByUrl('')
    }
  }
  deposit(){
    
    let acno=this.depositForm.value.acno
    let pswd=this.depositForm.value.pswd
    let amount=this.depositForm.value.amount
    if(this.depositForm.valid){
      this.ds.deposit(acno,pswd,amount)
      .subscribe((result:any)=>{
        // console.log(result)
        alert(result.message)
      },result=>{
        alert(result.error.message)
        // this.router.navigateByUrl('')
      })
    
    }else{
      alert("Invalid Deposit Form")
    }

    
  }



  withdraw(){
    let acno1=this.withdrawForm.value.acno1
    let pswd1=this.withdrawForm.value.pswd1
    let amount1=this.withdrawForm.value.amount1
    if(this.withdrawForm.valid){
      this.ds.withdraw(acno1,pswd1,amount1)
      .subscribe((result:any)=>{
        alert(result.message)
      },result=>{
        alert(result.error.message)
      })
      
    }else{
      alert("Invalid Form")
    }
    }
    // logout

    logout(){
      // remove acno and username
      localStorage.removeItem('currentAcno')
      localStorage.removeItem('currentName')
      localStorage.removeItem('token')
      // redirect to login page
      this.router.navigateByUrl('')

    }

    // deleteConfirm()

    deleteConfirm(){
      this.acno=JSON.parse(localStorage.getItem("currentAcno")||'') 
    }
    // cancel to set acno as empty
    cancel(){
      this.acno=""
    }

    onDelete(event:any){
      // asychronus
      this.ds.delete(event)
      .subscribe((result:any)=>{
        alert(result.message)
        this.logout()
      },result=>{
        alert(result.error.message)
      })
    }
    
}
