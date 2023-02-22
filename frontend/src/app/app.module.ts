import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RatingModule } from 'ng-starrating';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SearchbarComponent } from './components/partials/searchbar/searchbar.component';
import { TagsComponent } from './components/partials/tags/tags.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchbarComponent,
    TagsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RatingModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
