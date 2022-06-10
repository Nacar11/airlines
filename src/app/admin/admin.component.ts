import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Flight } from '../models/flights';
import { AdminService } from '../services/admin.services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users=[];
    
    constructor(
      private firestore:AngularFirestore,
      private router: Router,
      private fb: FormBuilder,
      private adminService: AdminService
    ) {
  
    }
    error: string = '';
  
    ngOnInit() {
  this.firestore.collection("User").snapshotChanges().subscribe((data) => {
    this.users = data.map(e => {
      return { id: e.payload.doc.id, name: e.payload.doc.data()["name"], email: e.payload.doc.data()["email"], bookedFlights: e.payload.doc.data()['bookedFlights'],}
    })
});
    }
  
    nav(destination: string) {
      this.router.navigate([destination]);
    }
    
  
  }