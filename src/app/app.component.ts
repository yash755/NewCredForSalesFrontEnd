import { Component, OnInit} from '@angular/core';
import { ClipboardModule } from 'ngx-clipboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public static RecommendationTabType = 1;
  public static ContentTabType = 2;
  title = 'NewsCredForSales';
  loggedInUser:string;
  selectedTab= 1;
  articles = [];
  contents = [];
  search = [];
  clipboardArticles = []
  selectedArticles = []

  ngOnInit(){
  }
  
  copySelectedArticles()
  { 
    let atrticleText='';
    let articleHTML='';
    let selectedArticles=[];
    selectedArticles = this.clipboardArticles;
    // if(this.selectedTab==1)
    // {
    //   this.selectedArticles=this.articles;
    //   this.clipboardArticles = this.articles;
    // }
    // else if(this.selectedTab==2)
    // {
    //   this.selectedArticles=this.contents;
    //   this.clipboardArticles = this.contents;
    // }
    // else
    // {
    //   this.selectedArticles=this.search;
    //   this.clipboardArticles = this.search
    // }
  
    for(let i=0; i<this.selectedArticles.length; i++)
    {
    // Creating plain text links
      if(i==0) 
        atrticleText+=this.selectedArticles[i].link;
      else
        atrticleText+="\n"+this.selectedArticles[i].link;
      
      //Creating ritch text links
      articleHTML+='<table id="abcm-article" style="font-family: verdana, serif;max-width: 350px;">';
      articleHTML+='<tbody>';
      articleHTML+='<tr>';
      articleHTML+='<td style="vertical-align: top;">';
      articleHTML+='<a href='+ this.selectedArticles[i].link +'>';
      articleHTML+='<img style="width: 80px;height: 60px;margin-right: 10px;" src="' + this.selectedArticles[i].image + '">';
      articleHTML+='</a>';
      articleHTML+='</td>';
      articleHTML+='<td>';
      articleHTML+='<a href='+ this.selectedArticles +'>';
      articleHTML+='<p style="font-size: 14px;margin: 0;">'+ this.selectedArticles[i].title+'</p>';
      articleHTML+='</a>';
      articleHTML+='<p style="color: #676767;font-size: 12px;margin: 5px 0 0;">' + this.selectedArticles[i].body + '</p>';
      articleHTML+='</td>';
      articleHTML+='</tr>';
      articleHTML+='</tbody>';
      articleHTML+='</table>';
      articleHTML+='<br>';
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
    console.log(this.selectedArticles);
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
      default:
      this.clipboardArticles = [];
    }
  }
  getLoggedInUser()
  {
    let context=Xrm.Utility.getGlobalContext();
    this.loggedInUser=context.userSettings.userName;
    console.log('LoggedInUser = '+this.loggedInUser);
  }

  getStaticVar(RecommendationTabType){
    return AppComponent[RecommendationTabType]
  }
  handleSelectionChange($event: any, contentType){
    switch(contentType) {
      case(AppComponent.RecommendationTabType):
        this.articles = $event
        break;
      case(AppComponent.ContentTabType):
        this.contents = $event
        break;
    }
    this.selectedArticles = $event
    this.clipboardArticles = $event
  }
}
