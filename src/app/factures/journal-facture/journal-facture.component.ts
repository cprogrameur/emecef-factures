import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-journal-facture',
  templateUrl: './journal-facture.component.html',
  styleUrls: ['./journal-facture.component.scss']
})
export class JournalFactureComponent implements OnInit {
  factures: any = [];
  constructor(private userservice: AuthService, private firebaseService: FirebaseService) {
     
   }

  ngOnInit(): void {
    this.firebaseService.getFactures().subscribe(
      (res:any)=>{
        this.factures = res
      }
    )
  }
  generate(facture:any){
    this.userservice.setDataInLocalStorage("message",facture.message);
    this.userservice.setDataInLocalStorage("invoiceHeader",JSON.stringify(facture.invoiceHeader))
    this.userservice.setDataInLocalStorage("invoiceAmounts",JSON.stringify(facture.invoiceAmounts))
    this.userservice.setDataInLocalStorage("invoicePayement",JSON.stringify(facture.invoicePayement))
    this.userservice.setDataInLocalStorage("invoiceSecurity",JSON.stringify(facture.invoiceSecurity))
    window.open('mafacture', '_blank');
  }
}
