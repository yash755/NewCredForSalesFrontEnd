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
  
  ngOnInit(){
    if(this.EntityName == 'contact' || this.EntityName == 'opportunity')
    {
       this.router.navigate(['/']);
    }
    else
    {
      this.router.navigate(['/analytics']);
    }
  }
  
  

  constructor(private router:Router,@Inject('dynamicCRMInfo') @Optional() private dynamicCRMInfo?: DynamicCRMInfo) {
      this.EntityName = dynamicCRMInfo.entity;
    }
}
