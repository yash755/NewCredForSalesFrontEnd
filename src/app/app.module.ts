import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'

import{OwlModule} from 'ngx-owl-carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecommendedContentComponent } from './recommended-content/recommended-content.component';
import { InTabLoader } from './components/spinner';
import { ArticleCard } from './components/card';
import { ArticleCardSlider } from './components/slider';
import { ContentLibraryComponent } from './content-library/content-library.component';
import { SearchComponent } from './search/search.component';
import {HttpClientModule} from '@angular/common/http';
import {CustomHttpClient} from '../services/http.service'
import { NewsCredAPI } from '../services/newsCredAPI';
import { NEWSCRED_CONSTANTS } from '../config';
import {DynamicCRMInfo} from '../services/dynamicCRM'

@NgModule({
  declarations: [
    AppComponent,
    InTabLoader,
    ArticleCard,
    ArticleCardSlider,
    RecommendedContentComponent,
    ContentLibraryComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OwlModule,
    FormsModule
  ],
  providers: [
    CustomHttpClient,
    NewsCredAPI,
    { provide: 'newsCredConstants', useValue: NEWSCRED_CONSTANTS },
    { provide: 'AUTH_HEADER', useValue: NEWSCRED_CONSTANTS.authHeader },
    { provide: 'dynamicCRMInfo', useValue: new DynamicCRMInfo()},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
