import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser:any;
  token:any;
  constructor() { }

  getUserDetails() {
    if(localStorage.getItem('userData')){
      return localStorage.getItem('userData')
    }else{
      return null
    }
  }
  getData() {
    if(localStorage.getItem('certs')){
      return localStorage.getItem('certs')
    }else{
      return null
    }
  }
  getDatas(name:string) {
    return localStorage.getItem(name)
  }
  setDataInLocalStorage(variableName: string, data: any) {
      localStorage.setItem(variableName, data);
  }
  getToken() {
      return localStorage.getItem('token');
  }
  clearStorage() {
      localStorage.clear();
  }
}
