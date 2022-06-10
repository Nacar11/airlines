import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore/'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';




@Injectable()
export class UserService {
   userCollection: AngularFirestoreCollection<User>;
    user: Observable<User[]>;
    userDoc: AngularFirestoreDocument<User>;

    constructor(public afs: AngularFirestore) {
        this.userCollection = this.afs.collection('User');
        // this.user = this.afs.collection('User').valueChanges();
        this.user = this.userCollection.snapshotChanges().pipe(map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as User;
                data.id = a.payload.doc.id;
                return data;
            });
        }));


    }

    getUsers(){
        return this.user;
    }

    addUser(user: User){
        this.userCollection.add(user);
    }

    loginUser(user: User){
        
    }

    deleteUser(user: User){
        this.userDoc = this.afs.doc(`User/${user.id}`);
        this.userDoc.delete();
    }

    bookFlight(_code: any, id:any){
        console.log(id);
        this.userDoc = this.afs.doc(`User/${id}`);
        this.userDoc.update({bookedFlights: _code});
    }

    
}