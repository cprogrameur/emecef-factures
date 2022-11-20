import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm:FormGroup;
  public errorMessage!:string;
  public isLogin:boolean=false;
  public service:any;
  public datas:any[]=[];
  public dataSource:any;

  constructor(private fb:FormBuilder,
              private userService:AuthService,
              private router:Router,
              public  firebaseservice:FirebaseService,
              public afAuth: AngularFireAuth
              ) { 
    this.loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(4)]]
    })
  } 

  onSubmit(){
    const formValue = this.loginForm.value ;
    return this.afAuth
      .signInWithEmailAndPassword(formValue.email, formValue.password)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.userService.setDataInLocalStorage('id', JSON.stringify(result));
            this.userService.setDataInLocalStorage('ifu', formValue.email);
            this.router.navigate(['dashboard']);
          }else{
            this.router.navigate(['login'])
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  public isLogedIn(){
    if(this.userService.getUserDetails() !=null){
      this.isLogin = true
    }
  }

  ngOnInit(): void {
    this.isLogedIn()
  }

}
