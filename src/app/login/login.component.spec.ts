import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { Users } from '../mockdata/user';
import { UserService } from '../services/user.service';

import { LoginComponent } from './login.component';

const data = from(Users);

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let afs: AngularFirestore;
  let userService: jasmine.SpyObj<UserService>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  const collectionStub = {
    snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(data)
  }
  
  const angularFirestoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
  }

    beforeEach(() => {


        TestBed.configureTestingModule({
          declarations: [LoginComponent],
            providers: [{provide: AngularFirestore, useValue: angularFirestoreStub}, {provide: LoginComponent, useValue: component},{ 
              provide: Router, 
              useValue: routerSpy
             }, {
              provide: UserService,
              useValue: userService,
            },],
        }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should login', ()  => {
      let mySpy = spyOn(component, "login").and.callThrough();
      fixture.detectChanges();
      component.login();
      expect(component.login).toHaveBeenCalled();
    }); 

  })
    

 