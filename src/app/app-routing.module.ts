import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CreateFlightComponent } from './create-flight/create-flight.component';
import { FlightsComponent } from './flights/flights.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewFlightsComponent } from './view-flights/view-flights.component';

const routes: Routes = [
  {
    path: 'flights',
    component: FlightsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: FlightsComponent
  },
  {
    path: 'admin/viewUsers',
    component: AdminComponent
  },{
    path: 'admin/viewFlights',
    component: ViewFlightsComponent
  },
  {
    path: 'admin/create',
    component: CreateFlightComponent
  }
];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
