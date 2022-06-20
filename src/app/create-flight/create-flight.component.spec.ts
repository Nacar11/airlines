import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { from } from 'rxjs';
import { CommonServiceModuleStubModule } from '../forTesting/common-service-module-stub.module';
import { Flights } from '../mockdata/flights';

import { CreateFlightComponent } from './create-flight.component';

fdescribe('CreateFlightComponent', () => {
  let component: CreateFlightComponent;
  let fixture: ComponentFixture<CreateFlightComponent>;
  let createSpy: any;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};
  let afs: AngularFirestore;
  

  const data = from(Flights);
    
    const insideCollection = jasmine.createSpyObj('collection', ['doc','snapshotChanges','valueChanges']);
    const insideDocs = jasmine.createSpyObj('doc', ['get','update','delete','set']);

    const fakeAfs = jasmine.createSpyObj('AngularFirestore', ['collection']);
    fakeAfs.collection.and.returnValue(insideCollection);
    insideCollection.snapshotChanges.and.returnValue(data);
    insideCollection.doc.and.returnValue(insideDocs);
    insideDocs.get.and.returnValue(data);


  beforeEach(async () => {

    createSpy = jasmine.createSpyObj("CreateFlightComponent", 
    ["onSubmit", "addFlight", "valueChanges",])
    await TestBed.configureTestingModule({
      declarations: [ CreateFlightComponent ],
      imports:[RouterTestingModule, CommonServiceModuleStubModule],
      providers:[
        { 
          provide: Router, 
          useValue: routerSpy
         },
        {
          provide: CreateFlightComponent,
          useValue: component,
        },{
          provide: AngularFirestore, useValue: fakeAfs
        }
      ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have addFlightForm form be invalid', () => {
    expect(component.addFlightForm.valid).toBeFalsy();
    console.log(component.addFlightForm.controls);
  });

  it('should have form controls to be invalid (fCDestination) and validators of form control exists', () => {
    let destination = component.addFlightForm.controls['fCDestination'];
    
    expect(destination.valid).toBeFalsy();
    
   
    let errors= {};
    errors = destination.errors;
    expect(errors['required']).toBeTruthy();
  });

  it('should have form controls to be invalid (fCOrigin) and validators of form control exists', () => {
    let origin = component.addFlightForm.controls['fCOrigin'];
    
    expect(origin.valid).toBeFalsy();

    let errors= {};
    errors = origin.errors;
    expect(errors['required']).toBeTruthy();
  });
  it('should have form controls to be invalid (fCDeparture) and validators of form control exists', () => {
    let departure = component.addFlightForm.controls['fCDeparture'];
    
    expect(departure.valid).toBeFalsy();

    let errors= {};
    errors = departure.errors;
    expect(errors['required']).toBeTruthy();
  });
  it('should have form controls to be invalid (fCArrival) and validators of form control exists', () => {
    let arrival = component.addFlightForm.controls['fCArrival'];
    
    expect(arrival.valid).toBeFalsy();

    let errors= {};
    errors = arrival.errors;
    expect(errors['required']).toBeTruthy();
  });
  it('should have form controls to be invalid (fCCode) and validators of form control exists', () => {
    let code = component.addFlightForm.controls['fCCode'];
    
    expect(code.valid).toBeFalsy();

    let errors= {};
    errors = code.errors;
    expect(errors['required']).toBeTruthy();
  });

  // it('should create a user when the onSubmit() function is called', () => {
  //   expect(component.registerForm.valid).toBeFalsy();
    

  //   let errors= {};
  //   errors = pass2.errors;
  //   expect(errors['required']).toBeTruthy();
  // });

  it('should test form validity(fCDestination)', () => {
    let departure = component.addFlightForm.controls['fCDestination'];
    
    expect(departure.valid).toBeFalsy();

    
    departure.setValue('Minglanilla');
    expect(departure.valid).toBeTruthy();
  });
  it('should test form validity(fCOrigin)', () => {
    let origin = component.addFlightForm.controls['fCOrigin'];
    
    expect(origin.valid).toBeFalsy();

    
    origin.setValue('Pardo');
    expect(origin.valid).toBeTruthy();
  });

  it('should test form validity(fCDeparture)', () => {
    let departure = component.addFlightForm.controls['fCDeparture'];
    
    expect(departure.valid).toBeFalsy();

    
    departure.setValue('2022-07-17T11:15');
    expect(departure.valid).toBeTruthy();
  });

  it('should test form validity(fCArrival)', () => {
    let arrival = component.addFlightForm.controls['fCArrival'];
    
    expect(arrival.valid).toBeFalsy();

    
    arrival.setValue('2022-07-17T11:45');
    expect(arrival.valid).toBeTruthy();
  });

  it('should test form validity(fCCode)', () => {
    let code = component.addFlightForm.controls['fCCode'];
    
    expect(code.valid).toBeFalsy();

    
    code.setValue('44A');
    expect(code.valid).toBeTruthy();
  });


  it('should have error be equals to `No fields must be empty!` if addFlight is not valid upon calling onSubmit()', () => {
    let departure= component.addFlightForm.controls['fCDeparture'];
    
    
    departure.setValue('Minglanilla');
    

    component.onSubmit();
    fixture.detectChanges();
    
    expect(component.error).toBe('No fields must be empty');
    
  });

  it('should add new flight if addFlightForm is valid', () => {
    let destination = component.addFlightForm.controls['fCDestination'];
    let origin = component.addFlightForm.controls['fCOrigin'];
    let departure = component.addFlightForm.controls['fCDeparture'];
    let arrival= component.addFlightForm.controls['fCArrival'];
    let code= component.addFlightForm.controls['fCCode'];
    
    destination.setValue('Minglanilla');
    origin.setValue('Pardo');
    departure.setValue("2022-07-17T11:15");
    arrival.setValue("2022-07-17T11:45")
    code.setValue("44A")

    expect(component.addFlightForm.valid).toBeTruthy();

    // component.onSubmit();
    // fixture.detectChanges();

    // expect(component.onSubmit().payload.name).toBe()
    
    // expect(component.error).toBe('No fields must be empty');
    

})

it(`should navigate to destination`, () => {
  component.nav("login");
  expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
  expect(routerSpy.navigate).toHaveBeenCalled();
});
});
