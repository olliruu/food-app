import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getRandomRecepies as recepies } from '../../DataFetch';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  recepyCount :Number = 1;
  randomRecepies = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("uid") == null) {
      this.router.navigate(['/login']);
    }
  }

  getRandomRecepies(): void{
    recepies(this.recepyCount).then(resp => {
      this.randomRecepies = resp;
    });
  }

  openRecepy(id: Number, name: String, image:String): void {
    this.router.navigate(['/recepy', id, name, image]);
  }

}
