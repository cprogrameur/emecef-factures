import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterComponent } from './clients/ajouter/ajouter.component';
import { ModifierComponent } from './clients/modifier/modifier.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GenFactureComponent } from './factures/gen-facture/gen-facture.component';
import { JournalFactureComponent } from './factures/journal-facture/journal-facture.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { LoginComponent } from './login/login.component';
import { MafactureComponent } from './mafacture/mafacture.component';
import { EditProduitComponent } from './produits/edit-produit/edit-produit.component';
import { ModProduitComponent } from './produits/mod-produit/mod-produit.component';
import { ProduitsComponent } from './produits/produits.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path:'not-found',component:FourOhFourComponent
  },
  {
    path:'',redirectTo:'/dashboard',pathMatch:'full'
  },
  {
    path:'dashboard',component:DashboardComponent
  },
  {
    path:'factures',component:JournalFactureComponent
  },
  {
    path:'mafacture',component:MafactureComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'signup',component:SignupComponent
  },
  {
    path:'factures/edit',component:GenFactureComponent
  },
  {
    path:'produits',component:ProduitsComponent
  },
  {
    path:'produits/ajouter',component:EditProduitComponent
  },
  {
    path:'produits/modifier',component:ModProduitComponent
  },
  {
    path:'clients',component:DashboardComponent
  },
  {
    path:'clients/modifier',component:ModifierComponent
  },
  {
    path:'clients/ajouter',component:AjouterComponent
  },
  {
    path:'**',redirectTo:'/not-found',pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
