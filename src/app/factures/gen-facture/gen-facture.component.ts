import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FactureService } from 'src/app/services/facture.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as pdfMake from "pdfmake/build/pdfmake"
import * as pdfFonts from "pdfmake/build/vfs_fonts"
const htmlToPdfmake = require("html-to-pdfmake");
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs
import * as uuid from 'uuid';


@Component({
   selector: 'app-gen-facture',
   templateUrl: './gen-facture.component.html',
   styleUrls: ['./gen-facture.component.scss']
})
export class GenFactureComponent implements OnInit {
   @ViewChild('invoice') FACTURE!: ElementRef
   public typeFacture!: FormGroup;
   public Client!: FormGroup;
   public Paiement!: FormGroup;
   public Produit!: FormGroup;
   public Message!: FormGroup;
   type: string = "d-none"
   msgcom: string = "d-none"
   prod: string = "d-none"
   pay: string = "d-none"
   client: string = "d-none"
   montype: string = "TYPE DE FACTURE"
   monproduit: any = []
   mypay: any = []
   monclient: any
   message: string = "Merci de nous faire confiance. A très bientôt!!!"
   invoice: any = {
      "ifu": "0202225606476",//YOUR IFU HERE
      "type": "FV",
      "items": [
         {
            "name": "Jus d'orange",
            "price": 1800,
            "quantity": 2,
            "taxGroup": "B"
         },
         {
            "name": "Article exonere",
            "price": 600,
            "quantity": 2.5,
            "taxGroup": "A"
         }
      ],
      "operator": {
         "name": "Test"
      }
   };
   invoiceHeader: any = []
   invoiceAmounts: any = []
   invoicePayement: any = []
   invoiceSecurity: any = []
   taxGroups: any
   types: any = [];
   operator: any
   invoiceId:string = ""
   constructor(private facture: FactureService, private userservice: AuthService, private router: Router, private fb: FormBuilder, private firebaseService: FirebaseService) {
      this.typeFacture = this.fb.group({
         type: ['', [Validators.required, Validators.maxLength(255)]],
      })
      this.Client = this.fb.group({
         ifu: ['', [Validators.maxLength(255)]],
         name: ['', [Validators.required, Validators.maxLength(255)]],
         contact: ['', [Validators.maxLength(255)]],
         address: ['', [Validators.maxLength(255)]],
      })
      this.Paiement = this.fb.group({
         type: ['', [Validators.required, Validators.maxLength(255)]],
         montant: ['', [Validators.required, Validators.maxLength(255)]],
      })
      this.Produit
         = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(255)]],
            price: ['', [Validators.required, Validators.maxLength(255)]],
            quantity: ['', [Validators.required, Validators.maxLength(255)]],
            taxGroup: ['', [Validators.required, Validators.maxLength(255)]],
         })
      this.Message = this.fb.group({
         message: ['', [Validators.required, Validators.maxLength(255)]],
      })
   }

   ngOnInit(): void {
      this.invoiceId = uuid.v4();
      this.facture.init()
      this.operator = {ifu:this.userservice.getDatas("ifu"),id:this.userservice.getDatas("id")}
      this.invoiceHeader = JSON.parse(this.userservice.getDatas("invoiceHeader")!)
      this.firebaseService.getProduit(this.invoiceHeader.nim).subscribe(
         (res: any) => {
            this.monproduit = res
         }
      )
      this.firebaseService.createFacture({id:this.invoiceId,ifGen:false})
      this.firebaseService.getClient(this.invoiceHeader.nim).subscribe(
         (res: any) => {
            if (res.length == 0) {
               this.monclient = { "ifu": "", "name": "", "contact": "", "address": "" }
            } else
               this.monclient = res[0]
         }
      )
   }
   invoiceType() {
      if (this.type == "") {
         this.type = "d-none"
      } else {
         this.facture.getInvoiceType().subscribe(
            (res: any) => {
               this.types = res
            }
         )
         this.type = ""
      }
   }
   onSubmit() {
      var type = this.typeFacture.value.type
      // this.userservice.setDataInLocalStorage("invoiceType",type)
      this.montype = type
      this.invoiceType()
   }
   generate(products: any, payement: any, client: any, operator: any,message:string,type:string) {
      if(confirm("Etes vous sûrs de vouloir générer la facture? Cette action est irréverssible")){
         this.facture.generate({
            "ifu": "0202225606476",//YOUR IFU HERE
            "type": type,
            "items": products,
            "operator": operator,
            "client": client,
            "payment": payement
         }
         );
         this.userservice.setDataInLocalStorage("message",message)
         this.download()
      }
   }
   invoicemsgcom() {
      if (this.msgcom == "") {
         this.msgcom = "d-none"
      } else {
         this.msgcom = ""
      }
   }
   onSubmitMsgCom() {
      var type = this.Message.value.message
      // this.userservice.setDataInLocalStorage("invoiceType",type)
      this.message = type
      this.invoicemsgcom()
   }
   invoicePay() {
      if (this.pay == "") {
         this.pay = "d-none"
      } else {
         this.facture.getPaymentType().subscribe(
            (res: any) => {
               this.types = res
            }
         )
         this.pay = ""
      }
   }
   onSubmitPay() {
      var type = this.Paiement.value
      this.firebaseService.createPayement({ ...type, invoiceId: this.invoiceId })
      this.firebaseService.getPayement(this.invoiceHeader.nim).subscribe(
         (res: any) => {
            this.mypay = res
         }
      )
      this.invoicePay()
   }
   invoiceClient() {
      if (this.client == "") {
         this.client = "d-none"
      } else {
         this.client = ""
      }
   }
   onSubmitClient() {
      var type = this.Client.value
      this.firebaseService.createClient({ ...type, invoiceId: this.invoiceId })
      this.firebaseService.getClient(this.invoiceHeader.nim).subscribe(
         (res: any) => {
            this.monclient = res[0]
            console.log(this.monclient)
         }
      )
      this.invoiceClient()
   }
   invoiceProd() {
      if (this.prod == "") {
         this.prod = "d-none"
      } else {
         this.prod = ""
      }
   }
   onSubmitProd() {
      var type = this.Produit.value
      this.firebaseService.createProduit({ ...type, invoiceId: this.invoiceId })
      this.monproduit[this.monproduit.length] = type
      this.firebaseService.getProduit(this.invoiceHeader.nim).subscribe(
         (res: any) => {
            this.monproduit = res
         }
      )
      this.invoiceProd()
   }
   download() {
      window.open('mafacture', '_blank');
   }
}
