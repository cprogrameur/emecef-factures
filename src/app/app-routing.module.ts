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
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';

const redirect = ()=> redirectUnauthorizedTo(['login'])
const routes: Routes = [
  {
    path:'not-found',component:FourOhFourComponent
  },
  {
    path:'',redirectTo:'/dashboard',pathMatch:'full'
  },
  {
    path:'dashboard',canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirect},component:DashboardComponent
  },
  {
    path:'factures',canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirect},component:JournalFactureComponent
  },
  {
    path:'mafacture',canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirect},component:MafactureComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'signup',component:SignupComponent
  },
  {
    path:'factures/edit',canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirect},component:GenFactureComponent
  },
  {
    path:'users',canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirect},component:UtilisateursComponent
  },
  {
    path:'produits',canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirect},component:ProduitsComponent
  },
  {
    path:'produits/ajouter',canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirect},component:EditProduitComponent
  },
  {
    path:'produits/modifier',canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirect},component:ModProduitComponent
  },
  {
    path:'clients',canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirect},component:DashboardComponent
  },
  {
    path:'clients/modifier',canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirect},component:ModifierComponent
  },
  {
    path:'clients/ajouter',canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirect},component:AjouterComponent
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
