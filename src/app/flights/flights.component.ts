import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {
  flightsArray=[];
  constructor(private router:Router, private firestore:AngularFirestore) { }

  ngOnInit(){
    this.firestore.collection("Flight").snapshotChanges().subscribe((data) => {
      this.flightsArray = data.map(e => {
        return { id: e.payload.doc.id, destination: e.payload.doc.data()["destination"], origin: e.payload.doc.data()["origin"], departure: e.payload.doc.data()["departure"], arrival: e.payload.doc.data()["arrival"], code: e.payload.doc.data()["code"], status: e.payload.doc.data()["status"]}
      })
  });
}

  nav(destination:string){
    this.router.navigate([destination]);
  }

}
