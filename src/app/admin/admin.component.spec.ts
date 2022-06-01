import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';


import { AdminComponent } from './admin.component';
import { CommonServiceModuleStubModule } from '../forTesting/common-service-module-stub/common-service-module-stub.module';
import { AdminService } from '../services/admin.services';
import { AngularFirestore } from '@angular/fire/compat/firestore';

fdescribe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let fireStoreSpy: any;
  let adminService: any;


  
  beforeEach(async () => {
    fireStoreSpy = jasmine.createSpyObj("AngularFireStore", ["collection", "subscribe"])
    adminService = jasmine.createSpyObj("AdminService", 
    ["viewFlights", "cancelFlight"])

    await TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      imports: [ RouterTestingModule, CommonServiceModuleStubModule],
      providers: [{
        provide: AngularFirestore, 
        useValue: fireStoreSpy
      },
      {
        provide: AdminService,
        useValue: adminService
      }]

    })
    .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

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
