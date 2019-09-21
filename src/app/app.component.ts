import { Component, OnInit} from '@angular/core';
import { ClipboardModule } from 'ngx-clipboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'NewsCredForSales';
  loggedInUser:string;
  selectedTab= 1;

  ngOnInit(){
  }
  copySelectedArticles(articles, contents, search)
  {
    let atrticleText='';
    let articleHTML='';
    let selectedArticles=[];
    if(this.selectedTab==1)
    {
      selectedArticles=articles;
    }
    else if(this.selectedTab==2)
    {
      selectedArticles=contents;
    }
    else
    {
      selectedArticles=search;
    }
  
    for(let i=0; i<selectedArticles.length; i++)
    {
    // Creating plain text links
      if(i==0) 
        atrticleText+=selectedArticles[i].link;
      else
        atrticleText+="\n"+selectedArticles[i].link;
      
      //Creating ritch text links
      articleHTML+='<table id="abcm-article" style="font-family: verdana, serif;max-width: 350px;">';
      articleHTML+='<tbody>';
      articleHTML+='<tr>';
      articleHTML+='<td style="vertical-align: top;">';
      articleHTML+='<a href='+ selectedArticles[i].link +'>';
      articleHTML+='<img style="width: 80px;height: 60px;margin-right: 10px;" src="' + selectedArticles[i].image + '">';
      articleHTML+='</a>';
      articleHTML+='</td>';
      articleHTML+='<td>';
      articleHTML+='<a href='+ selectedArticles +'>';
      articleHTML+='<p style="font-size: 14px;margin: 0;">'+ selectedArticles[i].title+'</p>';
      articleHTML+='</a>';
      articleHTML+='<p style="color: #676767;font-size: 12px;margin: 5px 0 0;">' + selectedArticles[i].body + '</p>';
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
  }
  checkActiveStage(tab)
  {
    this.selectedTab=tab;
  }
  getLoggedInUser()
  {
    let context=Xrm.Utility.getGlobalContext();
    this.loggedInUser=context.userSettings.userName;
    console.log('LoggedInUser = '+this.loggedInUser);
  }
}
