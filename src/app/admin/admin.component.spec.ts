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
import { Router } from '@angular/router';
import { Users } from '../mockdata/user';
import { By } from '@angular/platform-browser';


const data = from(Users);

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
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  
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
          provide: Router, 
          useValue: routerSpy
         },
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

      component.users = Users;
      expect(component.users).toEqual(Users);
  });

  it(`should navigate to destination`, () => {
    
    component.nav("login");
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
    expect(routerSpy.navigate).toHaveBeenCalled();
 });

 it(`should list all users`, () => {
  component.users = [];
  fixture.detectChanges();

  const listLength = 1;
  for(let i = 0; i < listLength; i ++) {
    component.users = [{
      email: 'christian@gmail.com',
      name: 'james',
      bookedFlights: '44A',
    }];


  }
  fixture.detectChanges();
  const userEls = fixture.debugElement.queryAll(By.css('tr.userList'));
  expect(userEls.length).toEqual(listLength);
  userEls.forEach((userEl, index) => {
    const name = userEl.query(By.css('td.name'));
    const email = userEl.query(By.css('td.email'));
    const bFlights = userEl.query(By.css('td.bFlights'));
    expect(name).toBeTruthy();
    expect(name.nativeElement.innerText).toEqual(component.users[index].name);
    expect(email).toBeTruthy();
    expect(email.nativeElement.innerText).toEqual(component.users[index].email);
    expect(bFlights).toBeTruthy();
    expect(bFlights.nativeElement.innerText).toEqual(component.users[index].bookedFlights);

});


 
});})

