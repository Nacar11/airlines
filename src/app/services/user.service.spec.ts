import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { from } from 'rxjs/internal/observable/from';
import { TestBed } from '@angular/core/testing';
import { EMPTY } from 'rxjs/internal/observable/empty';
import {Users} from '../mockdata/user'

const input: User[][] = [
  [

  ],
];


fdescribe('UserService', () => {
    let service: UserService;
    let afs: AngularFirestore;

    const data = from(Users);
    
    const insideCollection = jasmine.createSpyObj('collection', ['doc','valueChanges']);
    const insideDocs = jasmine.createSpyObj('doc', ['get','update','delete','set']);

    const fakeAfs = jasmine.createSpyObj('AngularFirestore', ['collection']);
    fakeAfs.collection.and.returnValue(insideCollection);
    insideCollection.valueChanges.and.returnValue(data);
    insideCollection.doc.and.returnValue(insideDocs);
    insideDocs.get.and.returnValue(data);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{provide: AngularFirestore, useValue: fakeAfs}],
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

    it('should add users', (done: DoneFn)  => {
        let data = [];  
        service.getUsers().subscribe((value) =>  {
            data.push(value);
            done();
        });
        expect(data).toEqual(Users);
    }); 

})

