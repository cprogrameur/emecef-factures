import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { ApiService } from './services/api.service';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AjouterComponent } from './clients/ajouter/ajouter.component';
import { ModifierComponent } from './clients/modifier/modifier.component';
import { FacturesComponent } from './factures/factures.component';
import { GenFactureComponent } from './factures/gen-facture/gen-facture.component';
import { JournalFactureComponent } from './factures/journal-facture/journal-facture.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { ProduitsComponent } from './produits/produits.component';
import { EditProduitComponent } from './produits/edit-produit/edit-produit.component';
import { ModProduitComponent } from './produits/mod-produit/mod-produit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { QRCodeModule } from 'angularx-qrcode';
import { MafactureComponent } from './mafacture/mafacture.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    FourOhFourComponent,
    DashboardComponent,
    AjouterComponent,
    ModifierComponent,
    FacturesComponent,
    GenFactureComponent,
    JournalFactureComponent,
    UtilisateursComponent,
    ProduitsComponent,
    EditProduitComponent,
    ModProduitComponent,
    MafactureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
 	  AngularFirestoreModule,
    AngularFireAuthModule,
    QRCodeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ApiService
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
