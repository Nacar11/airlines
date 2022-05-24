import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  nav(destination:string){
    this.router.navigate([destination]);
  }

}
