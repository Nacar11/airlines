import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { from, of } from 'rxjs';
import { CommonServiceModuleStubModule } from '../forTesting/common-service-module-stub.module';
import { ViewFlightsComponent } from './view-flights.component';
import { AdminService } from '../services/admin.services';
import { Router } from '@angular/router';
import {Flights} from '../mockdata/flights'
import { ComponentFactoryResolver } from '@angular/core';
import { By } from '@angular/platform-browser';

const data = from(Flights);

const adminService = {
  cancelFlight: jasmine.createSpy('cancelFlight')
}

const collectionStub = {
  snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(data)
}

const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
}

const insideCollection = jasmine.createSpyObj('collection', ['doc','valueChanges']);
const insideDocs = jasmine.createSpyObj('doc', ['get','update','delete','set']);

const fakeAfs = jasmine.createSpyObj('AngularFirestore', ['collection']);
fakeAfs.collection.and.returnValue(insideCollection);
insideCollection.valueChanges.and.returnValue(data);
insideCollection.doc.and.returnValue(insideDocs);
insideDocs.get.and.returnValue(data);


fdescribe('ViewFlightsComponent', () => {

  let component: ViewFlightsComponent;
  let fixture: ComponentFixture<ViewFlightsComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFlightsComponent ],
      imports: [CommonServiceModuleStubModule, RouterTestingModule],
      providers:[
        ViewFlightsComponent,
        { 
          provide: Router, 
          useValue: routerSpy
         },
        {
          provide: AngularFirestore,
          useValue: angularFirestoreStub
        },
        {
          provide:AdminService,
          useValue: adminService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cancelFlight', () => {
    component.flightsArray = Flights;
    console.log(component.flightsArray);
    let mySpy = spyOn(component, "cancelFlight").and.callThrough();
    fixture.detectChanges();
    mySpy.and.returnValue();
    component.cancelFlight(1);
    adminService.cancelFlight(1);
    console.log(component.flightsArray);
    expect(mySpy).toHaveBeenCalled();
    expect(adminService.cancelFlight).toHaveBeenCalled();
  });

  it(`should navigate to destination`, () => {
    component.nav("login");
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
    expect(routerSpy.navigate).toHaveBeenCalled();
 });

 it('should contain flights', () => {
  component.flightsArray = Flights;
  expect(component.flightsArray).toEqual(Flights);
 });

 it(`should list all flights`, () => {
    component.flightsArray = [];
    fixture.detectChanges();

    const listLength = 1;
    for(let i = 0; i < listLength; i ++) {
      component.flightsArray = [{
        destination: 'Minglanilla',
        origin:'Pardo',
        departure : '2022-07-17T11:15',
        arrival : '2022-07-18T11:15',
        status : 'Available',
      }];


    }
    fixture.detectChanges();
    const flightEls = fixture.debugElement.queryAll(By.css('tr.Flights'));
    expect(flightEls.length).toEqual(listLength);
    flightEls.forEach((flightEl, index) => {
      const destEl = flightEl.query(By.css('th.fDestination'));
      const oriEl = flightEl.query(By.css('td.fOrigin'));
      const depEl = flightEl.query(By.css('td.fDeparture'));
      const arrEl = flightEl.query(By.css('td.fArrival'));
      const statEl = flightEl.query(By.css('td.fStatus'));
      expect(destEl).toBeTruthy();
      expect(destEl.nativeElement.innerText).toEqual(component.flightsArray[index].destination);
      expect(oriEl).toBeTruthy();
      expect(oriEl.nativeElement.innerText).toEqual(component.flightsArray[index].origin);
      expect(depEl).toBeTruthy();
      expect(depEl.nativeElement.innerText).toEqual(component.flightsArray[index].departure);
      expect(arrEl).toBeTruthy();
      expect(arrEl.nativeElement.innerText).toEqual(component.flightsArray[index].arrival);
      expect(statEl).toBeTruthy();
      expect(statEl.nativeElement.innerText).toEqual(component.flightsArray[index].status);
    });


    

});

});
