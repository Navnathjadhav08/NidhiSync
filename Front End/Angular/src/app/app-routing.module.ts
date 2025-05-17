import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent }     from './pages/register/register.component';
import { BusinessInfoComponent } from './pages/business-info/business-info.component';
import { PricingComponent }      from './pages/pricing/pricing.component';
import { DashboardComponent } from './Dashboards/dashboard/dashboard.component';
import { ProductsComponent } from './Dashboards/products/products.component';
import { GenerateBillComponent } from './Dashboards/generate-bill/generate-bill.component';
import { BillPreviewComponent } from './Dashboards/bill-preview/bill-preview.component';
import { ManageUserComponent } from './Dashboards/manage-user/manage-user.component';
const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'business', component: BusinessInfoComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'generate-bill', component: GenerateBillComponent },
  { path: 'bill-preview', component: BillPreviewComponent },
  { path: 'manage-user', component: ManageUserComponent },
  { path: '**', redirectTo: 'register' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
