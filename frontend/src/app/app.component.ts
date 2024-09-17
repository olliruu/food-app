import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'food-app';

  constructor(private router: Router) {}

  showLinks(): Boolean {
    let route: String = this.router.url;
    return route != '/login' && route != '/register';
  }
}
