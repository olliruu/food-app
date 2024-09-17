import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { login } from '../../DataFetch'
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  failed : Boolean = false;
  name : string = '';
  password: string = '';

  constructor(private router: Router) { }

  signIn(): void {
    this.failed = false;
    if (this.name.length > 0 && this.password.length > 0) {

      login(this.name, this.password).then(resp => {
        sessionStorage.setItem("uid", resp);
        this.router.navigate(['/']);
      }).catch(e => {
        this.failed = true;
        this.name = '';
        this.password = '';
      });
    }
  }

 moveToRegister(): void {
  this.router.navigate(['/register']);
}

}
