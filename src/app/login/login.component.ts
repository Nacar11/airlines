import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage = 'Login Failed';
  constructor(private router: Router, private userService: UserService, private firestore:AngularFirestore) { }
  users=[];

  ngOnInit() {
    this.firestore.collection("User").snapshotChanges().subscribe((data) => {
      this.users = data.map(e => {
        return {email: e.payload.doc.data()["email"], password: e.payload.doc.data()["password"], id: e.payload.doc.id}
      })
  });
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
  let i = 0;
     for(i = 0; i < this.users.length; i++){
      if(this.users[i].email == this.fcEmail.value && this.users[i].password == this.fcPassword.value){
        if(this.users[i].email == "admin@appsdev.com"){
          console.log(this.users[i].id);
    this.userService.getId(this.users[i].id, i);
          this.nav('admin/viewFlights');
        } else{
          console.log(this.users[i].id);
          this.nav('flights');
          this.userService.getId(this.users[i].id, i);
        }
      }
     }
    
  }




  nav(destination:string){
    this.router.navigate([destination]);
  }
}
