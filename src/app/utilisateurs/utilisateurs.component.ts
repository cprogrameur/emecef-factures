import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent implements OnInit {
  factures: any = [];
  constructor(private router:Router, private userservice: AuthService, private firebaseService: FirebaseService,public afAuth:AngularFireAuth) {
     
   }

  ngOnInit(): void {
    this.firebaseService.getVendeurs().subscribe(
      (res:any)=>{
        this.factures = res
      }
    )
  }
  delete(id:string){
    if(confirm("Etes vous sûrs de vouloir suprimmer ce élément ?")){
      this.firebaseService.delete(id)
    }
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
