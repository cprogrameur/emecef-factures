import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { getStorage, ref, listAll } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }
  //création d'élément

  createUser(value: any) {
    return this.db.collection('vendeurs').add(value);
  }
  createProduit(value: any) {
    return this.db.collection('produits_fac').add(value)
  }
  getProduit(nim: string) {
    return this.db.collection('produits_fac', ref => ref.where("invoiceId", '==', nim)).valueChanges({ idField: 'ref' });
  }
  createPayement(value: any) {
    return this.db.collection('paiements_fac').add(value)
  }
  getPayement(nim: string) {
    return this.db.collection('paiements_fac', ref => ref.where("invoiceId", '==', nim)).valueChanges({ idField: 'ref' });
  }
  createFacture(value: any) {
    return this.db.collection('factures').add(value)
  }
  getFacture(nim: string) {
    return this.db.collection('factures', ref => ref.where("id", '==', nim)).valueChanges();
  }
  getFactures() {
    return this.db.collection('factures').valueChanges();
  }
  createClient(value: any) {
    return this.db.collection('clients_fac').add(value)
  }
  getClient(nim: string) {
    return this.db.collection('clients_fac', ref => ref.where("invoiceId", '==', nim)).valueChanges({ idField: 'ref' });
  }
  //supression d'élément

  deleteProduit(id: any) {
    return this.db.collection("produits_fac").doc(id).delete();
  }
  deletePaiement(id: any) {
    return this.db.collection("paiements_fac").doc(id).delete();
  }
  //modification d'élement
  modifierProduit(id: any,value: any) {
    return this.db.doc(`produits_fac/${id}`).update(value)
  }
  modifierPaiements(id: any,value: any) {
    return this.db.doc(`paiements_fac/${id}`).update(value)
  }
  modifierClients(id: any,value: any) {
    return this.db.doc(`clients_fac/${id}`).update(value)
  }
}
