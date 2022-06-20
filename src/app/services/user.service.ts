import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore/'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';


@Injectable({ providedIn: 'root' })
export class UserService {
   userCollection: AngularFirestoreCollection<User>;
    user: Observable<User[]>;
    userDoc: AngularFirestoreDocument<User>;
    id: any; 
    i: any;

    constructor(public afs: AngularFirestore) {
        this.userCollection = this.afs.collection('User');
        this.user = this.afs.collection('User').valueChanges();
        // this.user = this.userCollection.snapshotChanges().pipe(map(changes => {
        //     return changes.map(a => {
        //         const data = a.payload.doc.data() as User;
        //         data.id = a.payload.doc.id;
        //         return data;
        //     });
        // }));


    }

    getId(uid:string, i:any){
        this.id = uid;
        this.i = i;
        console.log(this.i)
        console.log(i)
        console.log(this.id);
        console.log(uid);
    }

    returnID(){
        return this.id;
    }

    returnIndex(){
        return this.i;
    }

    getUsers(){
        return this.user;
    }

    addUser(user: User){
        this.userCollection.add(user);
        return this.user;
    }

    deleteUser(user: User){
        this.userDoc = this.afs.doc(`User/${user.id}`);
        this.userDoc.delete();
        return this.user;
        
    }

    bookFlight(_code: any, id:any){
        this.userDoc = this.afs.doc(`User/${id}`);
        this.userDoc.update({bookedFlights: _code});
        return this.user;
    }

    
}