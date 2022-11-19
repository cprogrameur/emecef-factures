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
    return this.db.collection('userDatas').add(value);
  }
  createProduit(value: any) {
    return this.db.collection('produits_fac').add(value)
  }
  getProduit(nim: string) {
    return this.db.collection('produits_fac', ref => ref.where("nim", '==', nim)).valueChanges({ idField: 'id' });
  }
  createPayement(value: any) {
    return this.db.collection('paiements_fac').add(value)
  }
  getPayement(nim: string) {
    return this.db.collection('paiements_fac', ref => ref.where("nim", '==', nim)).valueChanges({ idField: 'id' });
  }
  
  createClient(value: any) {
    return this.db.collection('clients_fac').add(value)
  }
  getClient(nim: string) {
    return this.db.collection('clients_fac', ref => ref.where("nim", '==', nim)).valueChanges({ idField: 'id' });
  }
  //supression d'élément

  deleteFiliere(id: any) {
    return this.db.collection("filiere").doc(id).delete();
  }
  deleteProgramme(id: any) {
    return this.db.collection("programmes").doc(id).delete();
  }
  deleteBulletin(id: any) {
    return this.db.collection("bulletins").doc(id).delete();
  }
  deleteEtudiant(id: any) {
    return this.db.collection("etudiants").doc(id).delete();
  }
  deleteParent(id: any) {
    return this.db.collection('parent').doc(id).delete;
  }
  deleteMatiere(id: any) {
    return this.db.collection('matiere').doc(id).delete;
  }
  deleteNote(id: any) {
    return this.db.collection('note').doc(id).delete;
  }
  deleteComptabilite(id: any) {
    return this.db.collection('comptabilite').doc(id).delete;
  }
  deleteEmploisTemps(id: any) {
    return this.db.collection('emploitemps').doc(id).delete;
  }
  deleteNiveau(id: any) {
    return this.db.collection('niveau').doc(id).delete;
  }
  deleteAdmin(id: any) {
    return this.db.collection('admin').doc(id).delete;
  }
  deleteDocument(id: any) {
    return this.db.collection('document').doc(id).delete;
  }
  deleteEpreuve(id: any) {
    return this.db.collection('epreuve').doc(id).delete;
  }

  //modification d'élement
  modifierBulletin(value: any, id: any) {
    return this.db.doc(`bulletins/${id}`).update(value)
  }
  modifierEtudiant(value: any, id: any) {
    return this.db.doc(`etudiants/${id}`).update(value)
  }
  modifierProgramme(value: any, id: any) {
    return this.db.doc(`programmes/${id}`).update(value)
  }
  modifierParent(value: any, id: any) {
    return this.db.doc(`parent/${id}`).update(value)
  }
  modifierNote(value: any, id: any) {
    return this.db.doc(`note/${id}`).update(value)
  }
  modifierEmploisTemps(value: any, id: any) {
    return this.db.doc(`emploitemps/${id}`).update(value)
  }
  modifierNiveau(value: any, id: any) {
    return this.db.doc(`niveau/${id}`).update(value)
  }
  modifierMatiere(value: any, id: any) {
    return this.db.doc(`matiere/${id}`).update(value)
  }
  modifierAdmin(value: any, id: any) {
    return this.db.doc(`bulletin/${id}`).update(value)
  }
}
