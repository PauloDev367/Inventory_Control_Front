import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './account/shared/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductSalesHistoryComponent } from './pages/product-sales-history/product-sales-history.component';
import { ProductPriceHistoryComponent } from './pages/product-price-history/product-price-history.component';
import { ProductStockHistoryComponent } from './pages/product-stock-history/product-stock-history.component';
import { SalesComponent } from './pages/sales/sales.component';
import { CategoriesComponent } from './pages/categories/categories.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        component: AuthenticationComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'products/:id', component: ProductDetailsComponent },
            { path: 'products/:id/sales', component: ProductSalesHistoryComponent },
            { path: 'products/:id/prices', component: ProductPriceHistoryComponent },
            { path: 'products/:id/stock-movement', component: ProductStockHistoryComponent },
            { path: 'sales', component: SalesComponent },
            { path: 'categories', component: CategoriesComponent },
        ],
        canActivate: [authGuard]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
