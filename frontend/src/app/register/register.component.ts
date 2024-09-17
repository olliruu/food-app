import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { register } from '../../DataFetch'
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  failed: Boolean = false;
  name: string = '';
  password: string = '';

  constructor(public router: Router){  }

  signUp(): void {
    this.failed = false;
    if (this.name.length > 0 && this.password.length > 0) {

      register(this.name, this.password).then(resp => {
        sessionStorage.setItem("uid", resp);
        this.router.navigate(['/']);
      }).catch(e => {
        this.failed = true;
        this.name = '';
        this.password = '';
      });
    }
  }

  moveToLogin(): void {
    this.router.navigate(['/login']);
  }

}
