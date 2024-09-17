import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.css'
})
export class CalenderComponent {

  let week = null;

  constructor(private router: Router) { }

  function openRecepy(id) : void {
    this.router.navigate(['/recepy', id]);
  }

  function deleteRecepy(id) : void {

  }

  function previous() : void{

  }

  function next(){

  }
}
