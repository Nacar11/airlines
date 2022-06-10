import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore/'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Flight } from '../models/flights';

@Injectable({ providedIn: 'root' })
export class AdminService {
   flightCollection: AngularFirestoreCollection<Flight>;
    flight: Observable<Flight[]>;
    flightDoc: AngularFirestoreDocument<Flight>;

    constructor(public afs: AngularFirestore) {
        this.flightCollection = this.afs.collection('Flight');
        this.flight = this.flightCollection.snapshotChanges().pipe(map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Flight;
                data.id = a.payload.doc.id;
                return data;
            });
        }));
    }

    viewFlights(){
        return this.flight;
    }

    addFlight(flight: Flight){
        this.flightCollection.add(flight);
    }

    cancelFlight(id: any){
        this.flightDoc = this.afs.doc(`Flight/${id}`);
        this.flightDoc.update({status: 'Cancelled'});
    }

    
}