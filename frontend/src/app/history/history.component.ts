import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getHistory, deleteHistory } from '../../DataFetch';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  recepyHistory = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("uid") != null) {
      getHistory().then(resp => {
        console.log(resp);
        this.recepyHistory = resp;
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  deleteRecepy(id:Number) : void{
    deleteHistory(id).then(resp => { }).catch(e => console.log(e));
    this.recepyHistory = this.recepyHistory.filter(item => item['id'] != id);
  }

  openRecepy(id: Number, name: String, image:String): void{
    this.router.navigate(['/recepy', id, name, image]);
  }
}
