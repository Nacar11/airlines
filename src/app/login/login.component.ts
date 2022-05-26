import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '@angular/fire/auth';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage = 'Login Failed';
  constructor(private router: Router, private userService: UserService) { }
  private users: Map<string, User> = new Map<string, User>();

  ngOnInit() {
    users: this.userService.getUsers().subscribe();
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

  login(){

  }




  nav(destination:string){
    this.router.navigate([destination]);
  }
}
