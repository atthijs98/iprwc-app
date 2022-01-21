import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductComponent } from './components/product/product.component';
import { ProductStartComponent } from './components/product/product-start/product-start.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { ProductResolverService } from './shared/resolvers/product-resolver.service';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { AdminComponent } from './components/admin/admin.component';
import { Role } from './models/roles.model';
import { ProductManagementComponent } from './components/admin/product/product-management.component';
import { ProductManagementStartComponent } from './components/admin/product/product-start/product-management-start.component';
import { ProductManagementEditComponent } from './components/admin/product/product-edit/product-management-edit.component';
import { UserComponent } from './components/admin/user/user.component';
import { UserResolverService } from './shared/resolvers/user-resolver.service';
import { UserStartComponent } from './components/admin/user/user-start/user-start.component';
import { OrderComponent } from './components/order/order.component';
import { OrderStartComponent } from './components/order/order-start/order-start.component';
import { CheckoutComponent } from './components/order/checkout/checkout.component';
import { OrderAdminComponent } from './components/admin/order/order.component';
import { OrderResolverService } from './shared/resolvers/order-resolver.service';
import { ProfileComponent } from './components/profile/profile.component';
import {UserOrderResolverService} from "./shared/resolvers/user-order-resolver.service";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, resolve: [ProductResolverService]},
  { path: 'profile/:userId', component: ProfileComponent, canActivate: [AuthGuardService], resolve: [UserOrderResolverService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'products', component: ProductComponent, canActivate: [AuthGuardService], resolve: [ProductResolverService], children: [
      {path: '', component: ProductStartComponent },
      {path: ':id', component: ProductDetailComponent}
    ]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuardService], data: {roles: [Role.Admin]}},
  {path: 'product-management', component: ProductManagementComponent, data: {roles: [Role.Admin]}, canActivate: [AuthGuardService], resolve: [ProductResolverService], children: [
      {path: '', component: ProductManagementStartComponent },
      {path: 'new', component: ProductManagementEditComponent},
      {path: ':id/edit', component: ProductManagementEditComponent}
    ]},
  {path: 'order-admin', component: OrderAdminComponent, data: {roles: [Role.Admin]}, canActivate: [AuthGuardService], resolve: [OrderResolverService], children: [
      {path: '', component: OrderStartComponent },
    ]},
  {path: 'user-management', component: UserComponent, data: {roles: [Role.Admin]}, canActivate: [AuthGuardService], resolve: [UserResolverService], children: [
      {path: '', component: UserStartComponent },
    ]},
  {path: 'order', component: OrderComponent, canActivate: [AuthGuardService], children: [
      {path: '', component: OrderStartComponent},
      {path: 'checkout', component: CheckoutComponent}
    ]},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
