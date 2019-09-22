import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{OwlModule} from 'ngx-owl-carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecommendedContentComponent } from './recommended-content/recommended-content.component';
import { ContentLibraryComponent } from './content-library/content-library.component';
import { SearchComponent } from './search/search.component';
import {HttpClientModule} from '@angular/common/http';
import {CustomHttpClient} from '../services/http.service'
import { NewsCredAPI } from '../services/newsCredAPI';
import {NEWSCRED_CONSTANTS} from '../config';
import {DynamicCRMInfo} from '../services/dynamicCRM'

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
  providers: [
    CustomHttpClient,
    NewsCredAPI,
    { provide: 'newsCredConstants', useValue: NEWSCRED_CONSTANTS },
    { provide: 'dynamicCRMInfo', useValue: new DynamicCRMInfo({},'717', {
        accountName: 'NewsCred',
        email: 'thecontact@devnewscred.com',
        id: '0035500000VR3naAAD',
        industry: '',
        name: 'The Contact'
      })
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
