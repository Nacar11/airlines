import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Flight } from '../models/flights';
import { AdminService } from '../services/admin.services';

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.scss']
})
export class CreateFlightComponent implements OnInit {
  flight: Flight ={
    destination: '',
    origin: '',
    departure: '',
    arrival: '',
    code: '',
    status: '',
  }
  flightsArray=[];
    
    constructor(
      private firestore:AngularFirestore,
      private router: Router,
      private fb: FormBuilder,
      private adminService: AdminService
    ) {
  
    }
  
  
    addFlightForm = this.fb.group({
      fCDestination: ['', Validators.required],
      fCOrigin: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      fCDeparture: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      fCArrival: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      fCCode: [
        '',
        {
          validators: [Validators.required],
        },
      ],
    });
  
    error: string = '';
  
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
  
    onSubmit() {
      if (!this.addFlightForm.valid) {
        {
          this.error = 'No fields must be empty';
          return;
        }
      }
      if (this.addFlightForm.valid) {
        var payload: {
          destination: string;
          origin: string;
          departure: string;
          arrival: string;
          code: string;
          status: string;
        };
        payload = {
          destination: this.f['fCDestination'].value,
          origin: this.f['fCOrigin'].value,
          departure: this.f['fCDeparture'].value,
          arrival: this.f['fCArrival'].value,
          code: this.f['fCCode'].value,
          status: 'Available',
        };
        console.log(payload);
        this.adminService.addFlight(payload);
      }
    }
  
    get f() {
      return this.addFlightForm.controls;
    }



  
  }