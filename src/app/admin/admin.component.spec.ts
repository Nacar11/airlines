import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonServiceModuleStubModule } from '../forTesting/common-service-module-stub.module';

import { AdminComponent } from './admin.component';
import { AdminService } from '../services/admin.services';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, of } from 'rxjs';
import { Flight } from '../models/flights';


const input: Flight[][] = [[
  { destination: 'Manila',
  origin: 'Cebu',
  departure: '02/02/02 11:59PM',
  arrival: '02/02/02 11:59PM',
  code: 'E120',
  status: 'Active'},
]];

const data = from(input);


fdescribe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let fireStoreSpy: jasmine.SpyObj<AngularFirestore>;
  let adminService: jasmine.SpyObj<AdminService>;
  
  beforeEach(async () => {
    let fireStoreSpy = jasmine.createSpyObj("AngularFireStore", ["collection"])
    let adminService = jasmine.createSpyObj("AdminService", 
    ["viewFlights", "cancelFlight"])

    await TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      imports: [ RouterTestingModule, CommonServiceModuleStubModule],
      providers: [AdminComponent,{
        provide: AngularFirestore, 
        useValue: fireStoreSpy
      },
      {
        provide: AdminService,
        useValue: adminService
      },
    ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fireStoreSpy.collection.and.returnValue(of(data));
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    console.log(component.flightsArray);
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
