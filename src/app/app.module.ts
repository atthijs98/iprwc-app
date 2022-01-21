import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { CommonModule } from '@angular/common';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { GeneralStateService } from './shared/services/general-state.service';
import { ProductComponent } from './components/product/product.component';
import { ProductStartComponent } from './components/product/product-start/product-start.component';
import { ProductService } from './components/product/product.service';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductItemComponent } from './components/product/product-list/product-item/product-item.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { SafePipe } from './shared/safe.pipe';
import { AdminComponent } from './components/admin/admin.component';
import { ProductManagementEditComponent } from './components/admin/product/product-edit/product-management-edit.component';
import { ProductManagementListComponent } from './components/admin/product/product-list/product-management-list.component';
import { ProductManagementStartComponent } from './components/admin/product/product-start/product-management-start.component';
import { ProductManagementComponent } from './components/admin/product/product-management.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { UserComponent } from './components/admin/user/user.component';
import { UserStartComponent } from './components/admin/user/user-start/user-start.component';
import { UserListComponent } from './components/admin/user/user-list/user-list.component';
import { UserDetailComponent } from './components/admin/user/user-detail/user-detail.component';
import { UserService } from './shared/services/user.service';
import { OrderComponent } from './components/order/order.component';
import { OrderAdminComponent } from './components/admin/order/order.component';
import { ShoppingListComponent } from './components/order/shopping-list/shopping-list.component';
import { OrderStartComponent } from './components/order/order-start/order-start.component';
import { CheckoutComponent } from './components/order/checkout/checkout.component';
import { ShoppingListService } from './components/order/shopping-list/shopping-list.service';
import { OrderService } from './components/order/order.service';
import { OrderListComponent } from './components/admin/order/order-list/order-list.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    SidenavListComponent,
    ProductComponent,
    ProductStartComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductDetailComponent,
    SafePipe,
    AdminComponent,
    ProductManagementComponent,
    ProductManagementEditComponent,
    ProductManagementListComponent,
    ProductManagementStartComponent,
    UserComponent,
    UserStartComponent,
    UserListComponent,
    UserDetailComponent,
    OrderComponent,
    ShoppingListComponent,
    OrderStartComponent,
    CheckoutComponent,
    OrderListComponent,
    OrderAdminComponent,
    ProfileComponent
  ],
  imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        CommonModule,
        FlexLayoutModule,
        AppRoutingModule,
        MaterialModule,
        HttpClientModule,
        ReactiveFormsModule,
        YouTubePlayerModule,
        MatButtonToggleModule,
        MatCarouselModule.forRoot()
  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    GeneralStateService,
    ProductService,
    OrderService,
    UserService,
    ShoppingListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
