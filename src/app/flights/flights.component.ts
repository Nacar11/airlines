import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent implements OnInit {
  flightsArray = [];
  users = [];
  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.firestore
      .collection('Flight')
      .snapshotChanges()
      .subscribe((data) => {
        this.flightsArray = data.map((e) => {
          return {
            id: e.payload.doc.id,
            destination: e.payload.doc.data()['destination'],
            origin: e.payload.doc.data()['origin'],
            departure: e.payload.doc.data()['departure'],
            arrival: e.payload.doc.data()['arrival'],
            code: e.payload.doc.data()['code'],
            status: e.payload.doc.data()['status'],
          };
        });
      });
    this.firestore
      .collection('User')
      .snapshotChanges()
      .subscribe((data) => {
        this.users = data.map((e) => {
          return {
            id: e.payload.doc.id,
            name: e.payload.doc.data()['name'],
            email: e.payload.doc.data()['email'],
          };
        });
      });
  }

  nav(destination: string) {
    this.router.navigate([destination]);
  }

  bookFlight(i: number) {
    this.userService.bookFlight(this.flightsArray[i].code, 'XARjQCXRJOaFSEZEM8Hz');
    console.log(this.flightsArray[i].code);
    console.log('this has been called');
  }
}
