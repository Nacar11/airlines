import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Flight } from '../models/flights';
import { AdminService } from '../services/admin.services';

@Component({
  selector: 'app-view-flights',
  templateUrl: './view-flights.component.html',
  styleUrls: ['./view-flights.component.scss']
})
export class ViewFlightsComponent implements OnInit {
  flight: Flight ={
    destination: '',
    origin: '',
    departure: '',
    arrival: '',
    code: '',
    status: '',
  }
  flightsArray=[];
  component: any;
    
    constructor(
      private firestore:AngularFirestore,
      private router: Router,
      private fb: FormBuilder,
      private adminService: AdminService
    ) {
  
    }
  
    ngOnInit() {
      this.firestore.collection("Flight").snapshotChanges().subscribe((data) => {
        this.flightsArray = data.map(e => {
          return { id: e.payload.doc.id, destination: e.payload.doc.data()["destination"], origin: e.payload.doc.data()["origin"], departure: e.payload.doc.data()["departure"], arrival: e.payload.doc.data()["arrival"], code: e.payload.doc.data()["code"], status: e.payload.doc.data()["status"]}
        })
  });
    }
  
    nav(destination: string) {
      this.router.navigate([destination]);
    }


    cancelFlight(i: number){
      this.adminService.cancelFlight(this.flightsArray[i].id);
      console.log('this has been called');
    }
  
  }