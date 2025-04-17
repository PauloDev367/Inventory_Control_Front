import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './account/shared/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        component: AuthenticationComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent }
        ],
        canActivate: [authGuard]
    }
];
