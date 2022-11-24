import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  factures: any = [];
  constructor(private userservice: AuthService,public afAuth:AngularFireAuth, private router: Router, private fb: FormBuilder, private firebaseService: FirebaseService) {
     
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

  logout(){
    this.userservice.clearStorage();
    return this.afAuth.signOut().then(
      ()=>{
        this.router.navigate(['login'])
      }
    )
  }
}
