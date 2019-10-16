import { Component, OnInit, Inject, Optional } from '@angular/core';
import { ModalService } from '../modal';
import { read } from 'fs';
import { DynamicCRMInfo } from 'src/services/dynamicCRM';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-apikey',
  templateUrl: './apikey.component.html',
  styleUrls: ['./apikey.component.scss']
})
export class ApikeyComponent implements OnInit {
   isModalShown : Boolean ;
   APIKey : string;
  constructor(public newscredApp: AppComponent,private router:Router, private modalService: ModalService,@Inject('dynamicCRMInfo') @Optional() private dynamicCRMInfo?: DynamicCRMInfo) { 
   this.APIKey = "";
  }

  ngOnInit() {
    
   
  }
  
  ngAfterViewInit() {
    this.modalService.open('analyticsapikey');
  }

  openmodal(id)
  {
    this.modalService.open(id);
  }
  
  saveApiKey()
  {
    //dynamicCRMInfo.apiKey = "8178c61b21134cadb5651ff2fc724caf";
    if(environment.production)
    {
    var updateKey = (document.getElementById("inputkey") as HTMLInputElement).value;
    this.dynamicCRMInfo.UpdateKey(this.dynamicCRMInfo.entity,updateKey);
    this.newscredApp.ngOnInit();
    //location.reload();
    }
    else
    {
      location.reload();
      //this.newscredApp.ngOnInit();
    // this.router.navigate(["/"]);
    }
  }
  
}
