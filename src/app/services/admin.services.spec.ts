import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AdminService } from '../services/admin.services';
import { User } from '../models/User';
import { from } from 'rxjs/internal/observable/from';
import { TestBed } from '@angular/core/testing';
import { EMPTY } from 'rxjs/internal/observable/empty';
import {Users} from '../mockdata/user'
import { Auth, user } from '@angular/fire/auth';
import { Flights } from '../mockdata/flights';


fdescribe('AdminService', () => {
    let service: AdminService;
    let afs: AngularFirestore;
    let auth: Auth;

    const data = from(Flights);
    
    const insideCollection = jasmine.createSpyObj('collection', ['doc','valueChanges','add']);
    const insideDocs = jasmine.createSpyObj('doc', ['get','update','delete','set']);

    const fakeAfs = jasmine.createSpyObj('AngularFirestore', ['collection']);
    fakeAfs.collection.and.returnValue(insideCollection);
    insideCollection.valueChanges.and.returnValue(data);
    insideCollection.doc.and.returnValue(insideDocs);
    insideDocs.get.and.returnValue(data);

    beforeEach(() => {  
        TestBed.configureTestingModule({
            providers: [{provide: AngularFirestore, useValue: fakeAfs}, {provide: Auth, useValue: auth}],
        });

        afs = TestBed.inject(AngularFirestore);
        service = TestBed.inject(AdminService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
        expect(fakeAfs.collection).toHaveBeenCalledWith('Flight');
    });

    it('should get all flights', (done: DoneFn)  => {
        let data = [];  
        service.viewFlights().subscribe((value) =>  {
            data.push(value);
            done();
        });
        expect(data).toEqual(Flights);
    }); 

    it('should add flight', (done: DoneFn)  => {

        var payload: {
            destination: string;
            origin: string;
            departure: string;
            arrival: string;
            code: string;
            status: string;
          };
          payload = {
            destination:"Minglanilla",
            origin:"Pardo",
            departure:"2022-07-17T11:15",
            arrival:"2022-07-18T11:15",
            code:"44A",
            status:"Available"
          };

          let data = [];  

          service.addFlight(payload).subscribe((value) =>  {
            data.push(payload);
            done();
        });

        expect(data).toContain(payload);
    }); 


    it('should delete flight', (done: DoneFn)  => {
        var payload: {
            destination: string;
            origin: string;
            departure: string;
            arrival: string;
            code: string;
            status: string;
          };
          payload = {
            destination:"Minglanilla",
            origin:"Pardo",
            departure:"2022-07-17T11:15",
            arrival:"2022-07-18T11:15",
            code:"44A",
            status:"Available"
          };

          let data = [payload];  

            data.pop();
            done();
          
        expect(data).not.toContain(payload);
    }); 

 
    

});
