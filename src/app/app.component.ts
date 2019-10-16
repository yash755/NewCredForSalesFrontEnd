import { Component, OnInit, Optional, Inject, ɵɵqueryRefresh, Input} from '@angular/core';
import { Router } from '@angular/router';
import {DynamicCRMInfo} from '../services/dynamicCRM'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
 EntityName = ""
 APIKey = ""
  
  ngOnInit(){
    this.EntityName = this.dynamicCRMInfo.entity;
    this.dynamicCRMInfo.getAPIKey();
    this.APIKey =this.dynamicCRMInfo.apiKey;
    if(this.EntityName == 'contact' )
    {
      if(this.APIKey != null && this.APIKey != "")
      {
       this.router.navigate(['/']);
      }
      else
      {
       this.router.navigate(['/apikey'] );
      }
    }
    else if (this.EntityName == 'opportunity')
    {
      if(this.APIKey != null && this.APIKey != "")
      {
       this.router.navigate(['/']);
      }
      else
      {
       this.router.navigate(['/apikey']);
      }
   }
    else if(this.EntityName == 'account')
    {
      if(this.APIKey != null && this.APIKey != "")
      {
       this.router.navigate(['/analytics']);
      }
      else
      {
       this.router.navigate(['/apikey']);
      }
    }
  }
  
  

  constructor(private router:Router,@Inject('dynamicCRMInfo') @Optional() private dynamicCRMInfo?: DynamicCRMInfo) {
      this.EntityName = dynamicCRMInfo.entity;
      this.APIKey = dynamicCRMInfo.apiKey;
    }
}
