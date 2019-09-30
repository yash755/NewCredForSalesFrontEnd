import { Component, OnInit, Optional, Inject, ɵɵqueryRefresh, Input} from '@angular/core';
import { ClipboardModule } from 'ngx-clipboard';
import {DynamicCRMInfo} from '../services/dynamicCRM'
import { NewsCredAPI } from '../services/newsCredAPI';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public static RecommendationTabType = 1;
  public static ContentTabType = 2;
  public static SearchTabType = 3;
  title = 'NewsCredForSales';
  loggedInUser:string;
  selectedTab= 1;
  articles = [];
  contents = [];
  search = [];
  clipboardArticles = []
  selectedArticles = []
  contactName=""
  count=0
  recordId:number
  currentUserID:number
  isCopied:boolean
  ngOnInit(){
  }
  
  copySelectedArticles()
  { 
    let atrticleText='';
    let articleHTML='';
    let selectedArticles=[];
    selectedArticles = this.clipboardArticles;
    this.count=0;

    for(let i=0; i<this.selectedArticles.length; i++)
    {
    // Creating plain text links
      if(i==0) 
        atrticleText+=`${this.newsCredConstants.baseUrl}/${this.newsCredConstants.usedArticlesEndpoint}/${this.selectedArticles[i].guid}/${this.currentUserID}/${this.recordId}`;
      else
        atrticleText+="\n"+`${this.newsCredConstants.baseUrl}/${this.newsCredConstants.usedArticlesEndpoint}/${this.selectedArticles[i].guid}/${this.currentUserID}/${this.recordId}`;
      
      //Creating ritch text links
      articleHTML+='<table id="abcm-article" style="font-family: verdana, serif;max-width: 350px;">';
      articleHTML+='<tbody>';
      articleHTML+='<tr>';
      articleHTML+='<td style="vertical-align: top;">';
      articleHTML+='<a href='+ `${this.newsCredConstants.baseUrl}/${this.newsCredConstants.usedArticlesEndpoint}/${this.selectedArticles[i].guid}/${this.currentUserID}/${this.recordId}` +'>';
      articleHTML+='<img style="width: 80px;height: 60px;margin-right: 10px;" src="' + this.selectedArticles[i].image + '">';
      articleHTML+='</a>';
      articleHTML+='</td>';
      articleHTML+='<td>';
      articleHTML+='<a href='+ `${this.newsCredConstants.baseUrl}/${this.newsCredConstants.usedArticlesEndpoint}/${this.selectedArticles[i].guid}/${this.currentUserID}/${this.recordId}` +'>';
      articleHTML+='<p style="font-size: 14px;margin: 0;">'+ this.selectedArticles[i].title+'</p>';
      articleHTML+='</a>';
      articleHTML+='<p style="color: #676767;font-size: 12px;margin: 5px 0 0;">' + this.selectedArticles[i].body + '</p>';
      articleHTML+='</td>';
      articleHTML+='</tr>';
      articleHTML+='</tbody>';
      articleHTML+='</table>';
      articleHTML+='<br>';
      this.count++;
      //Calling is used api for the specific url
      //alert(this.currentUserID+"  "+this.recordId)
      this.isCopied = true;
      this.apiService.postUsedArticle(selectedArticles[i].guid, this.recordId, this.currentUserID)
      .subscribe((data)=>{
      });
      setTimeout(() => {
        this.isCopied = false;
      }, 2000); 
    }
    
    //copying the text
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = articleHTML;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.addEventListener('copy', function(e){
    e.clipboardData.setData('text/html', selBox.value);
    e.clipboardData.setData('text/plain', atrticleText);
    e.preventDefault();
    });
    document.execCommand('copy');
    //document.body.removeChild(selBox);
    let subject=this.dynamicCRMInfo.getCurrentUser().name+" copied "+this.count+" Links for "+this.contactName;
    this.dynamicCRMInfo.updateActivity(this.dynamicCRMInfo.getCurrectRecord().id, subject, atrticleText);
  }
  checkActiveStage(tab)
  {
    this.selectedTab=tab;
    switch(tab) {
      case(AppComponent.RecommendationTabType):
      this.clipboardArticles = this.articles;
        break;
      case(AppComponent.ContentTabType):
      this.clipboardArticles = this.contents;
      break;
      case(AppComponent.SearchTabType):
      this.clipboardArticles = this.search;
      break;
      default:
      this.clipboardArticles = [];
    }
  }
  sendAsEmail()
  {
    let articleHTML="";
    for(let i=0; i<this.selectedArticles.length; i++)
    {
      //Creating ritch text links
      articleHTML+='<table id="abcm-article" style="font-family: verdana, serif;max-width: 350px;">';
      articleHTML+='<tbody>';
      articleHTML+='<tr>';
      articleHTML+='<td style="vertical-align: top;">';
      articleHTML+='<a href='+ `${this.newsCredConstants.baseUrl}/${this.newsCredConstants.usedArticlesEndpoint}/${this.selectedArticles[i].guid}/${this.currentUserID}/${this.recordId}` +'>';
      articleHTML+='<img style="width: 80px;height: 60px;margin-right: 10px;" src="' + this.selectedArticles[i].image + '">';
      articleHTML+='</a>';
      articleHTML+='</td>';
      articleHTML+='<td>';
      articleHTML+='<a href='+ `${this.newsCredConstants.baseUrl}/${this.newsCredConstants.usedArticlesEndpoint}/${this.selectedArticles[i].guid}/${this.currentUserID}/${this.recordId}` +'>';
      articleHTML+='<p style="font-size: 14px;margin: 0;">'+ this.selectedArticles[i].title+'</p>';
      articleHTML+='</a>';
      articleHTML+='<p style="color: #676767;font-size: 12px;margin: 5px 0 0;">' + this.selectedArticles[i].body + '</p>';
      articleHTML+='</td>';
      articleHTML+='</tr>';
      articleHTML+='</tbody>';
      articleHTML+='</table>';
      articleHTML+='<br>';
    }
   this.dynamicCRMInfo.sendEmail(articleHTML);
  }

  getStaticVar(RecommendationTabType){
    return AppComponent[RecommendationTabType]
  }
  handleSelectionChange($event: any, contentType){
    switch(contentType) {
      case(AppComponent.RecommendationTabType):
        this.articles = $event
        this.selectedArticles = $event
        this.clipboardArticles = $event
        break;
      case(AppComponent.ContentTabType):
        this.contents = $event
        this.selectedArticles = $event
        this.clipboardArticles = $event
        break;
      case(AppComponent.SearchTabType):
        this.search = $event
        console.log(this.search)
        this.selectedArticles = $event
        this.clipboardArticles = $event
        break;
    }
    
    console.log(this.clipboardArticles)
  }

  constructor(private apiService: NewsCredAPI, @Inject('dynamicCRMInfo') @Optional() private dynamicCRMInfo?: DynamicCRMInfo, @Inject('newsCredConstants') @Optional() private newsCredConstants?: any) {
   this.contactName=dynamicCRMInfo.defaultData.contact.name;
   this.apiService.getRecordIdFromNewsCred()
      .then((data)=>{
        this.recordId=data["contact_id"];
      });
      this.apiService.getCurrentUserIdFromNewsCred()
      .then((data)=>{
        this.currentUserID=data["user_id"];
      });
   }
}
