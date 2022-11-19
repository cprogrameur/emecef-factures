import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public datas:any
  constructor(private _api:ApiService,private userService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.datas = [{role:"superadmin"}]
    console.log(this.datas)
  }
  logout(){
    this.userService.clearStorage();
    this.router.navigate(['/loginadmin'])
  }
}
