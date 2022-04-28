import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { WarehousesService } from './service/warehouses.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from './service/customer.service';
import { VendorService } from './service/vendor.service';
import { ProductService } from './service/product.service';
import { InventoryService } from './service/inventory.service';
import { OrderService } from './service/order.service';
import { ChartsModule } from 'ng2-charts';
import { PageComponent } from './page/page.component';
// import { LoginService } from './service/login.service';

@NgModule({
  declarations: [AppComponent, routingComponents, NavbarComponent, PageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([]),
    ChartsModule,
  ],
  providers: [
    CustomerService,
    WarehousesService,
    InventoryService,
    VendorService,
    ProductService,
    OrderService,
    // LoginService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
