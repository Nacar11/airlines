import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonServiceModuleStubModule } from '../forTesting/common-service-module-stub.module';
import { AdminComponent } from './admin.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { from } from 'rxjs/internal/observable/from';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/internal/Observable';

const input: User[][] = [
  [
    {
      id: 'eHaPwHvuuiOaLs8r4iXf',
      email: 'christian@gmail.com',
      name: 'james',
      bookedFlights: '44A',
    },
  ],
];

const data = from(input);

const collectionStub = {
  snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(data)
}

const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
}

fdescribe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let fireStoreSpy: jasmine.SpyObj<AngularFirestore>;
  let userService: jasmine.SpyObj<UserService>;


  
  beforeEach(async () => {
    // let fireStoreSpy = jasmine.createSpyObj('AngularFireStore', ['collection']);
    let service: AdminComponent;
  let angularFirestore: AngularFirestore;

    await TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [RouterTestingModule, CommonServiceModuleStubModule],
      providers: [
        AdminComponent,
        {
          provide: AngularFirestore,
          useValue: angularFirestoreStub,
        },
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    });

    service = TestBed.get(AdminComponent);
    angularFirestore = TestBed.get(AngularFirestore)
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
    expect(angularFirestoreStub.collection).toHaveBeenCalledWith('User');
  });

  it('should contain users', () => {

  });
  


  // it('should list all flights', () => {
  //   result =
  //   expect(angularFiresotreStub.collection).toHaveBeenCalledWith('Flight')
  // });

  // it('should have error = No fields must be empty if addFlightForm is not valid', () => {
  //   component.addFlightForm = component.fb.group({});
  //   console.log(component.addFlightForm);
  //   expect(component.addFlightForm).toBeTrue();
  //   // expect(test)

  // });
  // it('should have `addFlightForm` be valid upon calling onSubmit()', () => {
  //   component.addFlightForm = component.fb.group({});
  //
  //   // expect(test)

  // });
  // it('should console.log the correct payload upon calling onSubmit', () => {
  //   component.addFlightForm = component.fb.group({});
  //   console.log(component.addFlightForm);
  //   expect(component.addFlightForm).toBeTrue();
  //   // expect(test)

  // });
  // it('should cancel the corresponding flight number', () => {
  //   component.addFlightForm = component.fb.group({});
  //   console.log(component.addFlightForm);
  //   expect(component.addFlightForm).toBeTrue();
  //   // expect(test)

  // });
});
