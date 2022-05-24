import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  fcEmail = new FormControl();
  fcPassword = new FormControl();
  requestResult = '';
  title = 'Login';

  // async login(){
  //   var result:any = await this.api.post(environment.API_URL+"/user/login",{"email": this.fcEmail.value, "password": this.fcPassword.value}).toPromise();
  //   this.requestResult = result.data;
  //     if(result.success){
  //       this.nav('home');
  //     }
  //     }

  nav(destination:string){
    this.router.navigate([destination]);
  }
}
