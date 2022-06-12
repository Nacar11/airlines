import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { from } from 'rxjs';
import { CommonServiceModuleStubModule } from '../forTesting/common-service-module-stub.module';
import { ViewFlightsComponent } from './view-flights.component';
import { Flight } from '../models/flights';
import { AdminService } from '../services/admin.services';
import { Router } from '@angular/router';


const input: Flight[][] = [
  [
    {
      id:"",
      destination:"bora",
      origin:"asdas",
      departure:"2022-05-21T09:15",
      arrival:"2022-05-22T09:15",
      code:"342323",
      status:"Cancelled"
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

fdescribe('ViewFlightsComponent', () => {
  let component: ViewFlightsComponent;
  let fixture: ComponentFixture<ViewFlightsComponent>;
  let adminService: any;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {

    adminService = jasmine.createSpyObj("AdminService", 
    ["cancelFlight"])


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

  it('Cancel Flight', () => {
    expect(component).toBeTruthy();
  });
  it(`should navigate to destination`, () => {
    
    component.nav("login");
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
    expect(routerSpy.navigate).toHaveBeenCalled();
 });
});
