import { Component, OnInit, Inject, Optional } from '@angular/core';
import { ModalService } from '../modal';
import { read } from 'fs';
import { DynamicCRMInfo } from 'src/services/dynamicCRM';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { NEWSCRED_CONSTANTS } from 'src/config';
import { NewsCredAPI } from '../../services/newsCredAPI';

@Component({
  selector: 'app-apikey',
  templateUrl: './apikey.component.html',
  styleUrls: ['./apikey.component.scss']
})
export class ApikeyComponent implements OnInit {
  isModalShown: Boolean;
  APIKey: string;
  isError :Boolean = false;
  EntityName:string = "";
  ErrorMessage : string = "";
  constructor(private apiService: NewsCredAPI,public newscredApp: AppComponent, private router: Router, private modalService: ModalService, @Inject('dynamicCRMInfo') @Optional() private dynamicCRMInfo?: DynamicCRMInfo) {
    this.APIKey = "";

  }

  ngOnInit() {
    
    this.EntityName = this.dynamicCRMInfo.entity;
    if (environment.production) {
      this.dynamicCRMInfo.getAPIKey();
      this.APIKey = this.dynamicCRMInfo.apiKey;
    }
    else
      this.APIKey = NEWSCRED_CONSTANTS.authHeader;

    



    if (this.EntityName == 'account') {
      if ( this.APIKey!=undefined && this.APIKey != null && this.APIKey != "") {
        this.router.navigate(['/analytics']);
      }
      
    }

  }

  ngAfterViewInit() {
    this.modalService.open('analyticsapikey');
  }

  openmodal(id) {
    this.modalService.open(id);
  }

  saveApiKey() {
    var updateKey = (document.getElementById("inputkey") as HTMLInputElement).value;
    if (environment.production) {
      //var updateKey = (document.getElementById("inputkey") as HTMLInputElement).value;
      if (this.ValidAPIKey(updateKey)) {

        this.dynamicCRMInfo.UpdateKey(this.dynamicCRMInfo.entity, updateKey);
        this.newscredApp.ngOnInit();
        //location.reload();
      }
     
      //location.reload();
    }
    else {
      var updateKey = "ABCM 8178c61b21134cadb5651ff2fc724caf"
      if (this.ValidAPIKey(updateKey)) {

        //this.dynamicCRMInfo.UpdateKey(this.dynamicCRMInfo.entity, updateKey);
        this.newscredApp.ngOnInit();
      }
      else {
            this.isError = true;
            this.ErrorMessage = NEWSCRED_CONSTANTS.InvalidAPIKey;
      }
      //location.reload();
    }
  }

  ValidAPIKey(updateKeyInput) {
    if(updateKeyInput == undefined || updateKeyInput == "")
    {
      this.isError = true;
      this.ErrorMessage = NEWSCRED_CONSTANTS.EmptyAPIKey;
      return false;
    }
    else
    {
    return this.apiService.ValidateAPIKey(updateKeyInput)
    }
  }

}
