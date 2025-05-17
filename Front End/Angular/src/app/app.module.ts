import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { FormsModule ,ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent }      from './app.component';
import { AppRoutingModule }  from './app-routing.module';

// ← Standalone components (do NOT put these in declarations)
import { RegisterComponent }     from './pages/register/register.component';
import { BusinessInfoComponent } from './pages/business-info/business-info.component';
import { PricingComponent }      from './pages/pricing/pricing.component';
import { DashboardComponent } from './Dashboards/dashboard/dashboard.component';
// import { DashboardLayoutComponent } from './Dashboards/dashboard-layout/dashboard-layout.component';
import { ProductsComponent } from './Dashboards/products/products.component';
import { AddProductComponent } from './Dashboards/add-product/add-product.component';
import { AddEditProductComponent } from './Dashboards/products/add-edit-product/add-edit-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenerateBillComponent } from './Dashboards/generate-bill/generate-bill.component';
import { BillPreviewComponent } from './Dashboards/bill-preview/bill-preview.component';
import { ManageUserComponent } from './Dashboards/manage-user/manage-user.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductsComponent,
    AddProductComponent,
    AddEditProductComponent,
    GenerateBillComponent,
    BillPreviewComponent,
    ManageUserComponent
           // only the root AppComponent goes here
  ],
  imports: [
    BrowserModule,
    FormsModule,            // for ngModel in standalone components
    RegisterComponent,      // ← import the standalone pages
    BusinessInfoComponent,
    PricingComponent,
    AppRoutingModule ,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule
    // DashboardLayoutComponent
       // after the pages (order doesn’t strictly matter)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
