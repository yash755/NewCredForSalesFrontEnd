import { Component, OnInit, Optional, Inject, ɵɵqueryRefresh, Input} from '@angular/core';
import { ClipboardModule } from 'ngx-clipboard';
import {DynamicCRMInfo} from '../../services/dynamicCRM'
import { NewsCredAPI } from '../../services/newsCredAPI';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { currentId } from 'async_hooks';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public static RecommendationTabType = 1;
  public static ContentTabType = 2;
  public static SearchTabType = 3;
  title = 'NewsCredForSales';
  IsProduction :boolean = false;
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
  public isUsed=[]
  activeTab:any;
  
  constructor(private router:Router,private apiService: NewsCredAPI, 
    @Inject('dynamicCRMInfo') @Optional() private dynamicCRMInfo?: DynamicCRMInfo,
     @Inject('newsCredConstants') @Optional() private newsCredConstants?: any,) {
    this.contactName=dynamicCRMInfo.defaultData.contact.name;
    console.log(this.contactName);
    this.apiService.getRecordIdFromNewsCred()
       .then((data)=>{
         this.recordId=data["contact_id"];
       });
       this.apiService.getCurrentUserIdFromNewsCred()
       .then((data)=>{
         this.currentUserID=data["user_id"];
       });
      
    }

  ngOnInit() {
    this.IsProduction = environment.production
    this.isUsed=[];
    this.activeTab="cb1";
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
      this.isCopied = true;
      this.apiService.postUsedArticle(selectedArticles[i].guid, this.recordId, this.currentUserID)
      .subscribe((data)=>{
        if(data["use_id"]!=undefined && data["use_id"]!=null)
       {
         this.isUsed.push(selectedArticles[i].guid);
         this.uncheckAll(this.activeTab, this.isUsed);
       }
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
    this.router.onSameUrlNavigation ='reload';
    //document.body.removeChild(selBox);
    let subject=this.dynamicCRMInfo.getCurrentUser().name+" copied "+this.count+" Links for "+this.contactName;
    this.dynamicCRMInfo.updateActivity(this.dynamicCRMInfo.getCurrectRecord().id, subject, atrticleText);
   
  }

  uncheckAll(cb, used){
    if (this.selectedTab == HomeComponent.RecommendationTabType) {
      this.clipboardArticles = [];
      this.articles = []
    }
    else if (this.selectedTab == HomeComponent.ContentTabType) {
      this.clipboardArticles = [];
      this.contents = [];
    } 
    else if(this.selectedTab==HomeComponent.SearchTabType)
    {
      this.clipboardArticles = [];
      this.search = [];
    }
    used.forEach(element => {
      $('#'+cb+element+':checked').prop('checked',false); 
    });
  }

  checkActiveStage(tab)
  {
    this.selectedTab=tab;
    switch(tab) {
      case(HomeComponent.RecommendationTabType):
      this.clipboardArticles = this.articles;
      this.activeTab="cb1";
        break;
      case(HomeComponent.ContentTabType):
      this.clipboardArticles = this.contents;
      this.activeTab="cb2";
      break;
      case(HomeComponent.SearchTabType):
      this.clipboardArticles = this.search;
      this.activeTab="cb3";
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
      
      let getDefaultEmailTemplate="";
      this.apiService.getLastSavedEmailTemplate(this.currentUserID)
      .subscribe((data:any)=>{
      if(data.length>0)
       {
        getDefaultEmailTemplate=data[data.length-1].template;
        this.dynamicCRMInfo.sendEmail(getDefaultEmailTemplate);
       }
       else
       {
        getDefaultEmailTemplate = this.apiService.DefaultEmailBody()
        this.dynamicCRMInfo.sendEmail(getDefaultEmailTemplate);
       }
      });
      
  }

  getStaticVar(RecommendationTabType){
    return HomeComponent[RecommendationTabType]
  }
  handleSelectionChange($event: any, contentType){
    switch(contentType) {
      case(HomeComponent.RecommendationTabType):
        this.articles = $event
        this.selectedArticles = $event
        this.clipboardArticles = $event
        break;
      case(HomeComponent.ContentTabType):
        this.contents = $event
        this.selectedArticles = $event
        this.clipboardArticles = $event
        break;
      case(HomeComponent.SearchTabType):
        this.search = $event
        this.selectedArticles = $event
        this.clipboardArticles = $event
        break;
    }
    
    console.log(this.clipboardArticles)
  }

  ngAfterContentInit()
  {
    $("owl-nav disabled").remove();
  }


}
