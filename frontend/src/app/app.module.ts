import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RatingModule } from 'ng-starrating';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SearchbarComponent } from './components/partials/searchbar/searchbar.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { FoodpageComponent } from './components/pages/foodpage/foodpage.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { TitleComponent } from './components/partials/title/title.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { LoginComponent } from './components/pages/login/login.component';
import { InputComponentComponent } from './components/partials/input-component/input-component.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchbarComponent,
    TagsComponent,
    FoodpageComponent,
    CartComponent,
    TitleComponent,
    NotFoundComponent,
    LoginComponent,
    InputComponentComponent,
    InputValidationComponent,
    TextInputComponent,
    DefaultButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RatingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut:5000,
      positionClass: 'toast-bottom-right',
      newestOnTop:false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
