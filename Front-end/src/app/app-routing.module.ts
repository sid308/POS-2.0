import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerComponent } from './components/customer/customer.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentCustomerDetailComponent } from './components/payment-customer-detail/payment-customer-detail.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';
import { ProductComponent } from './components/product/product.component';
import { UsersComponent } from './components/users/users.component';
import { VendorComponent } from './components/vendor/vendor.component';
import { WarehousesComponent } from './components/warehouses/warehouses.component';
import { StockComponent } from './components/stock/stock.component';
import { StoreComponent } from './components/store/store.component';
import { PageComponent } from './page/page.component';

const routes: Routes = [
  { path: '', component: PageComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'invoice/:id', component: InvoiceComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'payment', component: PaymentComponent },
  {
    path: 'payment-customer-detail',
    component: PaymentCustomerDetailComponent,
  },
  { path: 'payment-history', component: PaymentHistoryComponent },
  { path: 'product', component: ProductComponent },
  { path: 'users', component: UsersComponent },
  { path: 'vendor', component: VendorComponent },
  { path: 'warehouses', component: WarehousesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: 'stock', component: StockComponent },
  { path: 'store', component: StoreComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [
  DashboardComponent,
  CustomerComponent,
  InventoryComponent,
  InvoiceComponent,
  OrdersComponent,
  PaymentComponent,
  PaymentCustomerDetailComponent,
  PaymentHistoryComponent,
  ProductComponent,
  PageComponent,
  UsersComponent,
  VendorComponent,
  WarehousesComponent,
  LoginComponent,
  StockComponent,
  StoreComponent,
];
