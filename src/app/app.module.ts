import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
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
import { CreateFlightComponent } from './create-flight/create-flight.component';
import { ViewFlightsComponent } from './view-flights/view-flights.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FlightsComponent,
    RegisterComponent,
    AdminComponent,
    CreateFlightComponent,
    ViewFlightsComponent,  
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
    NgbModule,
    AngularFireAuthModule
  ],
  providers: [UserService, AdminService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
