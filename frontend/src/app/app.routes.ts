import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TaskManagerComponent } from './components/task-manager/task-manager.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'task-manager', component: TaskManagerComponent, canActivate: [AuthGuard] }
];
