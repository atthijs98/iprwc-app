import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ProductComponent} from "./components/product/product.component";
import {ProductStartComponent} from "./components/product/product-start/product-start.component";
import {AuthGuardService} from "./auth/auth-guard.service";
import {ProductResolverService} from "./shared/resolvers/product-resolver.service";
import {ProductDetailComponent} from "./components/product/product-detail/product-detail.component";
import {AdminComponent} from "./components/admin/admin.component";
import {Role} from "./models/roles.model";
import {ProductManagementComponent} from "./components/admin/product/product-management.component";
import {ProductManagementStartComponent} from "./components/admin/product/product-start/product-management-start.component";
import {ProductManagementEditComponent} from "./components/admin/product/product-edit/product-management-edit.component";

const routes: Routes = [
  {path: '', redirectTo: '/products', pathMatch: 'full'},
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
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
