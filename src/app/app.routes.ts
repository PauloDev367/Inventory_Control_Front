import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './account/shared/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductsComponent } from './pages/products/products.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        component: AuthenticationComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'products', component: ProductsComponent },
        ],
        canActivate: [authGuard]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
