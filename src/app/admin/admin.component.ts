import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  flight: Flight ={
    destination: '',
    origin: '',
    departure: '',
    arrival: '',
    code: '',
    status: '',
  }
    
    constructor(
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
      this.adminService.viewFlights().subscribe(Flight => {
        console.log(Flight);
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

  
    // deleteBooking(Flights){
    //   this.flightService.deleteItem(Flights);
    // } for Flights
  
  }