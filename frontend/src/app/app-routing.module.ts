import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { CartComponent } from './components/pages/cart/cart.component';
import { CheckoutpageComponent } from './components/pages/checkoutpage/checkoutpage.component';
import { FoodpageComponent } from './components/pages/foodpage/foodpage.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'tag/:tag', component: HomeComponent },
  { path: 'food/:id', component: FoodpageComponent },
  { path: 'cart-page', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterPageComponent },
  {path:'checkout',component:CheckoutpageComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
