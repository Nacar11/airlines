import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import {Observable, pipe} from 'rxjs';
import { User } from 'src/app/models/user'
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
user: User ={
  id: '',
  email: '',
  name: '',
  password: '',
}
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {

  }

  addUser(user: User){

  }

  // registerForm: FormGroup = new FormGroup({
  //   fCName: new FormControl('', Validators.required),
  //   fCAge: new FormControl(0, Validators.min(1)),
  //   fCEmail: new FormControl('', Validators.required),
  //   fCPassword: new FormControl('', Validators.required),
  //   fCPassword2: new FormControl('', Validators.required),
  // });

  registerForm = this.fb.group({
    fCName: ['', Validators.required],
    fCAge: [
      '',
      {
        validators: [Validators.required, Validators.min(1)],
      },
    ],
    fCEmail: [
      '',
      {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur',
      },
    ],
    fCPassword: [
      '',
      {
        validators: [Validators.required, Validators.minLength(8)],
        updateOn: 'blur'
      },
    ],
    fCPassword2: [
      '',
      {
        validators: [Validators.required, Validators.minLength(8)],
        updateOn: 'blur'
      },
    ],
  });

  error: string = '';

  ngOnInit() {
    this.userService.getUsers().subscribe(User => {
      console.log(User);
    });
  }

  nav(destination: string) {
    this.router.navigate([destination]);
  }

  onSubmit() {
    if (
      this.registerForm.value['fCPassword'] !==
      this.registerForm.value['fCPassword2']
    ) {
      this.error = "Password doesn't match!";
      alert(this.error);
      return;
    }
    if (!this.registerForm.valid) {
      {
        this.error = 'No fields must be empty';
        return;
      }
    }
    if (this.registerForm.valid) {
      var payload: {
        name: string;
        email: string;
        password: string;
      };
      payload = {
        name: this.f['fCName'].value,
        email: this.f['fCEmail'].value,
        password: this.f['fCPassword'].value,
      };
      console.log(payload);
      this.userService.addUser(payload);
      this.nav('login');
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  get password() {
    return this.registerForm.controls['fCPassword'];
  }

  // deleteBooking(Flights){
  //   this.flightService.deleteItem(Flights);
  // } for Flights

}