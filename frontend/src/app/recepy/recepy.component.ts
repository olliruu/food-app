import { Component, Input, OnInit } from '@angular/core';
import { getRecepy } from '../../DataFetch';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recepy',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './recepy.component.html',
  styleUrl: './recepy.component.css'
})
export class RecepyComponent {

  @Input()
  id: number = -1;
  @Input()
  name: String = '';
  @Input()
  image: String = '';

  recepy: any = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("uid") != null) {
      getRecepy(this.id).then((resp) => {
        console.log(resp);
        this.recepy = resp;
      }).catch((e) => console.log(e));
    } else {
      this.router.navigate(['/login']);
    }
  }

}
