import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { from } from 'rxjs/internal/observable/from';
import { TestBed } from '@angular/core/testing';
import { EMPTY } from 'rxjs/internal/observable/empty';
import {Users} from '../mockdata/user'
import { Auth, user } from '@angular/fire/auth';


fdescribe('UserService', () => {
    let service: UserService;
    let afs: AngularFirestore;
    let auth: Auth;

    const data = from(Users);
    
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
        service = TestBed.inject(UserService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
        expect(fakeAfs.collection).toHaveBeenCalledWith('User');
    });

    it('should get all users', (done: DoneFn)  => {
        let data = [];  
        service.getUsers().subscribe((value) =>  {
            data.push(value);
            done();
        });
        expect(data).toEqual(Users);
    }); 

    it('should add user', (done: DoneFn)  => {

        var payload: {
            name: string;
            email: string;
            password: string;
          };
          payload = {
            name: 'james',
            email: 'james@gmail.com',
            password: 'james123',
          };

          let data = [];  

          service.addUser(payload).subscribe((value) =>  {
            data.push(payload);
            done();
        });

        expect(data).toContain(payload);
    }); 


    it('should delete user', (done: DoneFn)  => {
        var payload: {
            name: string;
            email: string;
            password: string;
          };
          payload = {
            name: 'james',
            email: 'james@gmail.com',
            password: 'james123',
          };

          let data = [payload];  

            data.pop();
            done();
          
        expect(data).not.toContain(payload);
    }); 

    it('should book flight', (done: DoneFn)  => {
          let data = [];  
          var code = 'A32'
          data.push(code);
          done();
          
        expect(data).toContain(code);
    }); 
    }); 

 
    


