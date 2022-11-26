import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FactureService } from 'src/app/services/facture.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as pdfMake from "pdfmake/build/pdfmake"
import * as pdfFonts from "pdfmake/build/vfs_fonts"
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
   public ClientMod!: FormGroup;
   public Paiement!: FormGroup;
   public PaiementMod!: FormGroup;
   public Produit!: FormGroup;
   public ProduitMod!: FormGroup;
   public Message!: FormGroup;
   public Aib!: FormGroup;
   type: string = "d-none"
   msgcom: string = "d-none"
   aib: string = "d-none"
   prod: string = "d-none"
   mod_prod: string = "d-none"
   list_prod: string = "d-none"
   pay: string = "d-none"
   mod_pay: string = "d-none"
   list_pay: string = "d-none"
   client: string = "d-none"
   list_client: string = "d-none"
   mod_client: string = "d-none"
   mod_aib: string = "d-none"
   montype: string = "TYPE DE FACTURE"
   monproduit: any = []
   monproduitmod: any = {}
   monproduitlist: any = []
   mypay: any = []
   mypaymod: any = {}
   mypaylist: any = []
   monclient: any
   monclientmod: any = {}
   monclientlist: any
   message: string = "Merci de nous faire confiance. A très bientôt!!!"
   monaib: string = ""
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
   invoiceId: string = ""
   constructor(private facture: FactureService, public userservice: AuthService, private router: Router, private fb: FormBuilder, private firebaseService: FirebaseService) {
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
      // this.typeFactureMod = this.fb.group({
      //    type: ['', [Validators.required, Validators.maxLength(255)]],
      // })
      this.ClientMod = this.fb.group({
         ifu: [this.monclientmod.ifu, [Validators.maxLength(255)]],
         name: [this.monclientmod.name, [Validators.required, Validators.maxLength(255)]],
         contact: [this.monclientmod.contact, [Validators.maxLength(255)]],
         address: [this.monclientmod.address, [Validators.maxLength(255)]],
      })
      this.PaiementMod = this.fb.group({
         type: [this.mypaymod.type, [Validators.required, Validators.maxLength(255)]],
         montant: [this.mypaymod.montant, [Validators.required, Validators.maxLength(255)]],
      })
      this.ProduitMod
         = this.fb.group({
            name: [this.monproduitmod.name, [Validators.required, Validators.maxLength(255)]],
            price: [this.monproduitmod.price, [Validators.required, Validators.maxLength(255)]],
            quantity: [this.monproduitmod.quantity, [Validators.required, Validators.maxLength(255)]],
            taxGroup: [this.monproduitmod.taxGroup, [Validators.required, Validators.maxLength(255)]],
         })
         this.Message = this.fb.group({
            message: ['', [Validators.required, Validators.maxLength(255)]],
         })
         this.Aib = this.fb.group({
            aib: ['', [Validators.required, Validators.maxLength(255)]],
         })
   }

   ngOnInit(): void {
      this.invoiceId = uuid.v4();
      this.facture.init()
      this.operator = { name: this.userservice.getDatas("ifu"), id: this.userservice.getDatas("id") }
      this.invoiceHeader = JSON.parse(this.userservice.getDatas("invoiceHeader")!)
      this.firebaseService.getProduit(this.invoiceHeader.nim).subscribe(
         (res: any) => {
            this.monproduit = res
         }
      )
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
   generate(products: any, payement: any, client: any, operator: any, message: string, type: string,aib:string) {
      if (confirm("Etes vous sûrs de vouloir générer la facture? Cette action est irréverssible")) {
         this.facture.generate(aib == ""?
            {
               "ifu": "0202225606476",
               "type": type,
               "items": this.tabProduit(products),
               "client": this.tabClient(client),
               "operator": operator,
               "payment": this.tabPay(payement)
            }:{
               "ifu": "0202225606476",
               "type": type,
               "aib":aib,
               "items": this.tabProduit(products),
               "client": this.tabClient(client),
               "operator": operator,
               "payment": this.tabPay(payement)
            }
         );
         console.log(this.tabPay(payement))
         this.userservice.setDataInLocalStorage("message", message)
         this.firebaseService.createFacture({
            id: this.invoiceId, invoiceHeader: JSON.parse(this.userservice.getDatas("invoiceHeader")!),
            invoiceAmounts: JSON.parse(this.userservice.getDatas("invoiceAmounts")!),
            invoicePayement: JSON.parse(this.userservice.getDatas("invoicePayement")!),
            invoiceSecurity: JSON.parse(this.userservice.getDatas("invoiceSecurity")!),
            message: this.userservice.getDatas("message")!
         }).then(
            (res: any) => {
               console.log({
                  id: this.invoiceId, invoiceHeader: JSON.parse(this.userservice.getDatas("invoiceHeader")!),
                  invoiceAmounts: JSON.parse(this.userservice.getDatas("invoiceAmounts")!),
                  invoicePayement: JSON.parse(this.userservice.getDatas("invoicePayement")!),
                  invoiceSecurity: JSON.parse(this.userservice.getDatas("invoiceSecurity")!),
                  message: this.userservice.getDatas("message")!
               })
               this.download()
            }
         )
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
      this.message = type
      this.invoicemsgcom()
   }
   invoiceaib() {
      if (this.aib == "") {
         this.aib = "d-none"
      } else {
         this.aib = ""
      }
   }
   onSubmitAib() {
      var type = this.Aib.value.aib
      this.monaib = type
      this.invoiceaib()
   }
   invoicePay() {
      if (this.pay == "") {
         this.pay = "d-none"
      } else {
         this.facture.getPaymentType().subscribe(
            (res: any) => {
               this.types = res
               console.log(this.types)
            }
         )
         this.pay = ""
      }
   }
   onSubmitPay() {
      var type = this.Paiement.value
      this.firebaseService.createPayement({ ...type, invoiceId: this.invoiceId })
      this.firebaseService.getPayement(this.invoiceId).subscribe(
         (res: any) => {
            this.mypay = res
            console.log(this.mypay)
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
      this.firebaseService.getClient(this.invoiceId).subscribe(
         (res: any) => {
            this.monclient = res[0]
            console.log(this.monclient)
         }
      )
      this.invoiceClient()
   }
   tabPay(tabs: any) {
      var tabP = []
      for (let tab of tabs) {
         tabP[tabP.length] = { "name": tab.type, "amount": tab.montant }
      }
      return tabP
   }
   tabClient(tabs: any) {
      var tabP = {
            "ifu": tabs.ifu,
            "name": tabs.name,
            "contact": tabs.contact,
            "address": tabs.address
          }
          console.log(tabP)
          console.log(tabs)
          return tabP
   }
   tabProduit(tabs: any) {
      var tabP = []
      for (let tab of tabs) {
         tabP[tabP.length] =  {
            "name": tab.name,
            "price": tab.price,
            "quantity": tab.quantity,
            "taxGroup": tab.taxGroup,
          }
      }
      return tabP
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
      this.firebaseService.getProduit(this.invoiceId).subscribe(
         (res: any) => {
            this.monproduit = res
            console.log(this.monproduit)
         }
      )
      this.invoiceProd()
   }
   invoicePayMod(id: string,pay:any) {
      if (this.mod_pay == "") {
         this.mod_pay = "d-none"
      } else {
         this.list_pay = "d-none"
         this.facture.getPaymentType().subscribe(
            (res: any) => {
               this.types = res
            }
         )
         this.userservice.setDataInLocalStorage("ref",id)
         this.mypaymod = pay
         this.mod_pay = ""
      }
   }
   invoicePayList() {
      if (this.list_pay == "") {
         this.list_pay = "d-none"
      } else {
         this.firebaseService.getPayement(this.invoiceId).subscribe(
            (res: any) => {
               this.mypaylist = res
            }
         )
         this.list_pay = ""
      }
   }
   onSubmitPayMod(id: string) {
      var type = this.PaiementMod.value
      this.firebaseService.modifierPaiements(id, { ...type, invoiceId: this.invoiceId }).then(
         (res: any) => {
            this.firebaseService.getPayement(this.invoiceId).subscribe(
               (res: any) => {
                  this.mypay = res
               }
            )
         }
      )
      this.invoicePayMod('','')
   }
   invoiceClientMod(id:string,client:any) {
      if (this.mod_client == "") {
         this.mod_client = "d-none"
      } else {
         this.list_client = "d-none"
         this.userservice.setDataInLocalStorage("ref",id)
         this.monclientmod = client
         this.ClientMod = this.fb.group({
            ifu: [this.monclientmod.ifu, [Validators.maxLength(255)]],
            name: [this.monclientmod.name, [Validators.required, Validators.maxLength(255)]],
            contact: [this.monclientmod.contact, [Validators.maxLength(255)]],
            address: [this.monclientmod.address, [Validators.maxLength(255)]],
         })
         this.mod_client = ""
      }
   }
   invoiceClientList() {
      if (this.list_client == "") {
         this.list_client = "d-none"
      } else {
         this.firebaseService.getClient(this.invoiceId).subscribe(
            (res: any) => {
               this.monclientlist = res
            }
         )
         this.list_client = ""
      }
   }
   onSubmitClientMod(id: string) {
      var type = this.ClientMod.value
      this.firebaseService.modifierClients(id, { ...type, invoiceId: this.invoiceId }).then(
         (res: any) => {
            this.firebaseService.getClient(this.invoiceId).subscribe(
               (res: any) => {
                  this.monclient = res[0]
                  console.log(this.monclient)
               }
            )
         })
      this.invoiceClientMod('','')
   }
   invoiceProdMod(id:string,produit:any) {
      if (this.mod_prod == "") {
         this.mod_prod = "d-none"
      } else {
         this.list_prod = "d-none"
         this.userservice.setDataInLocalStorage("ref",id)
         this.monproduitmod = produit
         this.ProduitMod
         = this.fb.group({
            name: [this.monproduitmod.name, [Validators.required, Validators.maxLength(255)]],
            price: [this.monproduitmod.price, [Validators.required, Validators.maxLength(255)]],
            quantity: [this.monproduitmod.quantity, [Validators.required, Validators.maxLength(255)]],
            taxGroup: [this.monproduitmod.taxGroup, [Validators.required, Validators.maxLength(255)]],
         })
         this.mod_prod = ""
      }
   }
   invoiceProdList() {
      if (this.list_prod == "") {
         this.list_prod = "d-none"
      }
      else {
         this.firebaseService.getProduit(this.invoiceId).subscribe(
            (res: any) => {
               this.monproduitlist = res
            }
         )
         this.list_prod = ""
      }
   }
   onSubmitProdMod(id:string) {
      var type = this.ProduitMod.value
      // this.monproduit[this.monproduit.length] = type
      this.firebaseService.modifierProduit(id,{ ...type, invoiceId: this.invoiceId }).then(
         (res: any) => {
            this.firebaseService.getProduit(this.invoiceId).subscribe(
               (res: any) => {
                  this.monproduit = res
               }
            )
         }
      )
      this.invoiceProdMod('','')
   }
   download() {
      window.open('mafacture', '_blank');
   }
}
