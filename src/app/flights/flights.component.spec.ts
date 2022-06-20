import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonServiceModuleStubModule } from '../forTesting/common-service-module-stub.module';
import { FlightsComponent } from './flights.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { from } from 'rxjs/internal/observable/from';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { Users } from '../mockdata/user';
import { By } from '@angular/platform-browser';


const data = from(Users);


const insideCollection = jasmine.createSpyObj('collection', ['doc','snapshotChanges','valueChanges']);
const insideDocs = jasmine.createSpyObj('doc', ['get','update','delete','set']);

const fakeAfs = jasmine.createSpyObj('AngularFirestore', ['collection']);
fakeAfs.collection.and.returnValue(insideCollection);
insideCollection.snapshotChanges.and.returnValue(data);
insideCollection.doc.and.returnValue(insideDocs);
insideDocs.get.and.returnValue(data);

fdescribe('FlightComponent', () => {
  let component: FlightsComponent;
  let fixture: ComponentFixture<FlightsComponent>;
  let fireStoreSpy: jasmine.SpyObj<AngularFirestore>;
  let userService: jasmine.SpyObj<UserService>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  
  beforeEach(async () => {
    // let fireStoreSpy = jasmine.createSpyObj('AngularFireStore', ['collection']);
    let service: FlightsComponent;
  let angularFirestore: AngularFirestore;
    await TestBed.configureTestingModule({
      declarations: [FlightsComponent],
      imports: [RouterTestingModule, CommonServiceModuleStubModule],
      providers: [
        FlightsComponent,
        { 
          provide: Router, 
          useValue: routerSpy
         },
        {
          provide: AngularFirestore,
          useValue: fakeAfs,
        },
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    });

    service = TestBed.get(FlightsComponent);
    angularFirestore = TestBed.get(AngularFirestore)
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(FlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fakeAfs.collection).toHaveBeenCalledWith('User');
  });

  it('should contain users', () => {

      component.users = Users;
      expect(component.users).toEqual(Users);
  });

  it(`should navigate to destination`, () => {
    
    component.nav("login");
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
    expect(routerSpy.navigate).toHaveBeenCalled();
 });

 it(`should list all flights`, () => {
  component.flightsArray = [];
  fixture.detectChanges();

  const listLength = 0;
  for(let i = 0; i < listLength; i ++) {
    component.users = [{
      destination:"Minglanilla",
      origin:"Pardo",
      departure:"2022-07-17T11:15",
      arrival:"2022-07-18T11:15",
      code:"44A",
    }];

  }
  fixture.detectChanges();
  const flightEls = fixture.debugElement.queryAll(By.css('article.flights'));
  expect(flightEls.length).toEqual(listLength);
  flightEls.forEach((flightEls, index) => {
    const destination = flightEls.query(By.css('h3.flights-destination'));
    const departure = flightEls.query(By.css('p.flights-departure'));
    const arrival = flightEls.query(By.css('p.flights-arrival'));
    const code = flightEls.query(By.css('p.flights-code'));
    expect(destination).toBeTruthy();
    expect(destination.nativeElement.innerText).toEqual(component.flightsArray[index].destination);
    expect(departure).toBeTruthy();
    expect(departure.nativeElement.innerText).toEqual(component.flightsArray[index].departure);
    expect(arrival).toBeTruthy();
    expect(arrival.nativeElement.innerText).toEqual(component.flightsArray[index].arrival);
    expect(code).toBeTruthy();
    expect(code.nativeElement.innerText).toEqual(component.flightsArray[index].code);

});


 
});})

