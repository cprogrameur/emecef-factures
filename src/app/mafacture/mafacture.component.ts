import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
  import { AuthService } from 'src/app/services/auth.service';
  import { FactureService } from 'src/app/services/facture.service';
  import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-mafacture',
  templateUrl: './mafacture.component.html',
  styleUrls: ['./mafacture.component.scss']
})
export class MafactureComponent implements OnInit {
     message: string = "Merci de nous faire confiance. A très bientôt!!!"
     invoiceHeader: any = []
     invoiceAmounts: any = []
     invoicePayement: any = []
     invoiceSecurity: any = []
     taxGroups: any
     types: any = [];
     operator: any
     constructor(private facture: FactureService, private userservice: AuthService, private router: Router, private fb: FormBuilder, private firebaseService: FirebaseService) {
        
      }
  
     ngOnInit(): void {
      this.invoiceHeader = JSON.parse(this.userservice.getDatas("invoiceHeader")!)
      this.invoiceAmounts = JSON.parse(this.userservice.getDatas("invoiceAmounts")!)
      this.invoicePayement = JSON.parse(this.userservice.getDatas("invoicePayement")!)
      console.log(this.invoicePayement)
      this.invoiceSecurity = JSON.parse(this.userservice.getDatas("invoiceSecurity")!)
      this.message = this.userservice.getDatas("message")!
     }}