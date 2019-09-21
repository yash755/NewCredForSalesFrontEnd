import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{OwlModule} from 'ngx-owl-carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecommendedContentComponent } from './recommended-content/recommended-content.component';
import { ContentLibraryComponent } from './content-library/content-library.component';
import { SearchComponent } from './search/search.component';
import {HttpClientModule} from '@angular/common/http';
import { ApiService } from './api.service';
@NgModule({
  declarations: [
    AppComponent,
    RecommendedContentComponent,
    ContentLibraryComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OwlModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
