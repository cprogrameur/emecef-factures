import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public registerForm!: FormGroup;


  ngOnInit(): void {

  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public afAuth: AngularFireAuth,
    private userService: AuthService,
    public afs: AngularFirestore,
    public firebaseService: FirebaseService,
  ) {
    this.registerForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      ifu: ['', [Validators.required]]
    })
  }

  async onSubmit() {
    const formValue = this.registerForm.value;
    try {
      const result = await this.afAuth
        .createUserWithEmailAndPassword(formValue.email, formValue.ifu)
      if (result) {
        this.firebaseService.createUser({ ...formValue, id: result.user?.uid })
        this.router.navigate(['dashboard']);
      };
    } catch (error: any) {
      window.alert(error.message);
    }

  }
}
