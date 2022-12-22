import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  // loginacno
  acno:any
  // to  hold transaction array
  transaction:any
  constructor(private ds:DataService) {
    this.acno=JSON.parse(localStorage.getItem('currentAcno')||'')
    // get transaction array from data service
    this.transaction=this.ds.getTransaction(this.acno)
    // console.log(this.transaction)
    .subscribe((result:any)=>{
      this.transaction=result.transaction
    },result=>{
      alert(result.error.message)
    })
   }

  ngOnInit(): void {
  }

  
}
