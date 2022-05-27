import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { LoginComponent } from './login/login.component';
import { FlightsComponent } from './flights/flights.component';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {UserService} from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component'
import { AdminService } from './services/admin.services';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FlightsComponent,
    RegisterComponent,
    AdminComponent,  
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    NgbModule
  ],
  providers: [UserService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
