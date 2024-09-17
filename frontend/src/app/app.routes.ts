import { Routes } from '@angular/router';

import { HistoryComponent } from './history/history.component';
import { MainComponent } from './main/main.component';
import { RecepyComponent } from './recepy/recepy.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

//redirect to login
export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'recepy/:id/:name/:image', component: RecepyComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];
