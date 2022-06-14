import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { CommonServiceModuleStubModule } from '../forTesting/common-service-module-stub.module';
import { User } from '../models/User';
import { from } from 'rxjs/internal/observable/from';
import { RegisterComponent } from './register.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';




const input: User[][] = [
  [
    {
      id: '',
      email: '',
      name: '',
      password: ''
    },
  ],
];

const data = from(input);



const userService = {
  getUsers: jasmine.createSpy('getUsers').and.returnValue(data)
}



fdescribe('RegisterComponent', () => {
  let routerSpy = {navigate: jasmine.createSpy('navigate')};
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerSpy: any;

  beforeEach(async () => {

    registerSpy = jasmine.createSpyObj("RegisterComponent", 
    ["onSubmit", "addUser", "valueChanges",])


    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [RouterTestingModule, CommonServiceModuleStubModule],
      providers: [
        { 
          provide: Router, 
          useValue: routerSpy
         },
        {
          provide: RegisterComponent,
          useValue: component,
        },
        {
          provide: UserService,
          useValue: userService
        },
        
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have register form be invalid', () => {
    expect(component.registerForm.valid).toBeFalsy();
    console.log(component.registerForm.controls);
  });

  it('should have form controls to be invalid (fcName) and validators of form control exists', () => {
    let name = component.registerForm.controls['fCName'];
    
    expect(name.valid).toBeFalsy();
    
   
    let errors= {};
    errors = name.errors;
    expect(errors['required']).toBeTruthy();
  });
  it('should have form controls to be invalid (fcAge) and validators of form control exists', () => {
    let age = component.registerForm.controls['fCAge'];
    
    expect(age.valid).toBeFalsy();

    let errors= {};
    errors = age.errors;
    expect(errors['required']).toBeTruthy();
  });
  it('should have form controls to be invalid (fcEmail) and validators of form control exists', () => {
    let email = component.registerForm.controls['fCEmail'];
    
    expect(email.valid).toBeFalsy();

    let errors= {};
    errors = email.errors;
    expect(errors['required']).toBeTruthy();
  });
  it('should have form controls to be invalid (fcPassword) and validators of form control exists', () => {
    let pass = component.registerForm.controls['fCPassword'];
    
    expect(pass.valid).toBeFalsy();

    let errors= {};
    errors = pass.errors;
    expect(errors['required']).toBeTruthy();
  });
  it('should have form controls to be invalid (fcPassword2) and validators of form control exists', () => {
    let pass2 = component.registerForm.controls['fCPassword2'];
    
    expect(pass2.valid).toBeFalsy();

    let errors= {};
    errors = pass2.errors;
    expect(errors['required']).toBeTruthy();
  });

  // it('should submit a user when the onSubmit() function is called', () => {
  //   expect(component.registerForm.valid).toBeFalsy();
    

    

  //   let errors= {};
  //   errors = pass2.errors;
  //   expect(errors['required']).toBeTruthy();
  // });
  it(`should navigate to destination`, () => {
    component.nav("login");
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
    expect(routerSpy.navigate).toHaveBeenCalled();
 });


  it('should test form validity(name)', () => {
    let name = component.registerForm.controls['fCName'];
    
    expect(name.valid).toBeFalsy();

    
    name.setValue('John Peter');
    expect(name.valid).toBeTruthy();
  });
  it('should test form validity(age)', () => {
    let age = component.registerForm.controls['fCAge'];
    
    expect(age.valid).toBeFalsy();

    
    age.setValue('10');
    expect(age.valid).toBeTruthy();
  });
  it('should test form validity(email)', () => {
    let email = component.registerForm.controls['fCEmail'];
    
    expect(email.valid).toBeFalsy();

    
    email.setValue('nacariodale@gmail.com');
    expect(email.valid).toBeTruthy();
  });
  it('should test form validity(pass)', () => {
    let pass = component.registerForm.controls['fCPassword'];
    
    expect(pass.valid).toBeFalsy();

    
    pass.setValue('iloveprogramming69');
    expect(pass.valid).toBeTruthy();
  });
  it('should test form validity(pass2)', () => {
    let pass2 = component.registerForm.controls['fCPassword2'];
    
    expect(pass2.valid).toBeFalsy();

    
    pass2.setValue('iloveprogramming69');
    expect(pass2.valid).toBeTruthy();
  });

  it('should have error be equals to `Password doesn`t match!` if passwords are not equal', () => {
    let pass1 = component.registerForm.controls['fCPassword'];
    let pass2 = component.registerForm.controls['fCPassword2'];
    
    pass1.setValue('iloveprogramming69');
    pass2.setValue('iloveprogramming68');

    component.onSubmit();
    fixture.detectChanges();
    
    expect(component.error).toBe("Password doesn't match!");
    
  });
  it('should have error be equals to `No fields must be empty!` if register is not validl upon calling onSubmit()', () => {
    let name= component.registerForm.controls['fCName'];
    
    
    name.setValue('John');
    

    component.onSubmit();
    fixture.detectChanges();
    
    expect(component.error).toBe('No fields must be empty');
    
  });
  it('should add create new user if registerForm is valid', () => {
    let name = component.registerForm.controls['fCName'];
    let age = component.registerForm.controls['fCAge'];
    let email = component.registerForm.controls['fCEmail'];
    let pass1= component.registerForm.controls['fCPassword'];
    let pass2= component.registerForm.controls['fCPassword2'];
    
    name.setValue('John');
    age.setValue(19);
    email.setValue("nacariodale@gmail.com");
    pass1.setValue("iloveyouunittestingsomuch")
    pass2.setValue("iloveyouunittestingsomuch")

    expect(component.registerForm.valid).toBeTruthy();

    // component.onSubmit();
    // fixture.detectChanges();

    // expect(component.onSubmit().payload.name).toBe()
    
    // expect(component.error).toBe('No fields must be empty');
    
  });
});


