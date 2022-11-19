import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-four-oh-four',
  templateUrl: './four-oh-four.component.html',
  styleUrls: ['./four-oh-four.component.scss']
})
export class FourOhFourComponent implements OnInit {

  constructor(private userService:AuthService,    public afAuth: AngularFireAuth,
    private router:Router) { }

  ngOnInit(): void {
  }
logout(){
  this.userService.clearStorage();
  return this.afAuth.signOut().then(() => {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  });
}
}
