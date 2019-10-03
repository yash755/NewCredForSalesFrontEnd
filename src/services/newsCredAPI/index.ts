import { Injectable, Optional, Inject } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {CustomHttpClient} from '../http.service';
import {DynamicCRMInfo} from '../dynamicCRM';
import { ArticleCategories } from '../../app/model/ArticleCategories';
import { promise } from 'protractor';
//import { currentId } from 'async_hooks';

@Injectable({
  providedIn: 'root'
})
export class NewsCredAPI{
  recordId:number
  currentUserID:number
  static getContactIdEndpoint = "v1/salesforce/contacts"
  static getLoggedInUserEndpoint = "v1/salesforce/users"
  static getFieldNameEndpoint = "v1/salesforce/contacts/field_names"

  static articleEndpoint = "v2/articles/recommendation"
  static articleCategoryEndpoint = "v1/categories/articles"
  static categoryEndpoint = "v1/categories"
  static recommendedArticlesEndpoint = "v2/articles/recommendation"
  static searchEndpoint = "v1/articles/search"
  static usedArticleEndpoint="v1/articles"
  static getEngagementContactsEndpoint="v1/salesforce/accounts/engagement/contact"
  static getEngagementUniqueContentEndpoint="v1/salesforce/accounts/engagement/unique-content"
  static getEngagementCtrEndpoint="v1/salesforce/accounts/engagement/ctr"
  static getContactsAnalyticsEndpoint="v1/salesforce/accounts/contact-analytics"
  static getContentAnalyticsEndpoint = "v1/salesforce/accounts/content-analytics"

  fields=[]
  public getRecommendedArticles(recordId:number, currentUserID:number):Observable<any>{
    const field_values = {"fieldName":"Contact.Title"};
    let url = `${this.newsCredConstants.baseUrl}/${NewsCredAPI.recommendedArticlesEndpoint}`
    let params = {
      account: this.dynamicCRMInfo.defaultData.contact.accountName,
      ...field_values,
      industry: this.dynamicCRMInfo.defaultData.contact.industry,
      record_id: recordId,
      user_id: currentUserID
    }
    return  this.httpClient.get(url, params);
  }

  public getContentLibraryArticles(category: ArticleCategories):Observable<any>{
    let params = {
      guid: category.guid
    }
    let url = `${this.newsCredConstants.baseUrl}/${NewsCredAPI.articleCategoryEndpoint}`
    return  this.httpClient.get(url, params);
  }

public getCategories():Observable<any>{
  let url = `${this.newsCredConstants.baseUrl}/${NewsCredAPI.categoryEndpoint}`
  let params = {
    email: this.dynamicCRMInfo.defaultData.currentUserEmail
  }
  return  this.httpClient.get(url,params);
}

public searchArticles(query: string):Observable<any>{
  let url = `${this.newsCredConstants.baseUrl}/${NewsCredAPI.searchEndpoint}`
  let params = {
    contact_email: this.dynamicCRMInfo.defaultData.contact.email,
    query,
    user_email: this.dynamicCRMInfo.defaultData.currentUserEmail
  }
  return this.httpClient.get(url, params)
}

//Nazish - fetching the contact id from NewsCred
public getRecordIdFromNewsCred():Promise<any>{
 let url=`${this.newsCredConstants.baseUrl}/${NewsCredAPI.getContactIdEndpoint}/${this.dynamicCRMInfo.defaultData.contact.id}`
 let params = {
  contact_email: this.dynamicCRMInfo.defaultData.contact.email,
  contact_name: this.dynamicCRMInfo.defaultData.contact.name
    }
 return this.httpClient.get(url, params).toPromise();
}

//Nazish - Getting current loggedIn user Id from NewsCred
public getCurrentUserIdFromNewsCred():Promise<any>{
let url=`${this.newsCredConstants.baseUrl}/${NewsCredAPI.getLoggedInUserEndpoint}/${this.dynamicCRMInfo.defaultData.currentUserEmail}`
return this.httpClient.get(url,"").toPromise()
}

//Nazish - Getting fields Name from the NewsCred
public getFieldNames(){
  let url=`${this.newsCredConstants.baseUrl}/${NewsCredAPI.getFieldNameEndpoint}`
  this.httpClient.get(url,"")
  .subscribe((data)=>{
   this.fields=data["names"];
  });
}

//Nazish - Posting the is used api to the newsCred on click on copy content...
public postUsedArticle(articleGuid:string, recordId:number, userId:number){
  let url=`${this.newsCredConstants.baseUrl}/${NewsCredAPI.usedArticleEndpoint}/${articleGuid}/used`
  let body={
    "record_id":recordId,
    "user_id":userId
  }
  return this.httpClient.post(url, body)
}

//Get Engagement Contacts Analytics
public getEngagementContacts(){
  let url=`${this.newsCredConstants.baseUrl}/${NewsCredAPI.getEngagementContactsEndpoint}`
  let body= "{\"contacts\":[{\"contactPageUrl\":\"https://newscred--abcm--newscred.cs90.visual.force.com/0031F00000ClWARQA3\",\"email\":\"steven.newman@newscred.com\",\"id\":\"0031F00000ClWARQA3\",\"name\":\"Steven Newman\"},{\"contactPageUrl\":\"https://newscred--abcm--newscred.cs90.visual.force.com/0031F00000MGRiaQAH\",\"email\":\"mohammad.faisal@newscred.com\",\"id\":\"0031F00000MGRiaQAH\",\"name\":\"Potato Maker\"}]}"
  
  return this.httpClient.post(url, body)
}

//Get Engagement CTr Analytics
public getEngagementCtr(){
  let url=`${this.newsCredConstants.baseUrl}/${NewsCredAPI.getEngagementCtrEndpoint}`
  let body= "{\"contacts\":[{\"contactPageUrl\":\"https://newscred--abcm--newscred.cs90.visual.force.com/0031F00000ClWARQA3\",\"email\":\"steven.newman@newscred.com\",\"id\":\"0031F00000ClWARQA3\",\"name\":\"Steven Newman\"},{\"contactPageUrl\":\"https://newscred--abcm--newscred.cs90.visual.force.com/0031F00000MGRiaQAH\",\"email\":\"mohammad.faisal@newscred.com\",\"id\":\"0031F00000MGRiaQAH\",\"name\":\"Potato Maker\"}]}"
  
  return this.httpClient.post(url, body)
}

//Get Engagement Unique Content Analytics
public getEngagementUniqueContent(){
  let url=`${this.newsCredConstants.baseUrl}/${NewsCredAPI.getEngagementUniqueContentEndpoint}`
  let body= "{\"contacts\":[{\"contactPageUrl\":\"https://newscred--abcm--newscred.cs90.visual.force.com/0031F00000ClWARQA3\",\"email\":\"steven.newman@newscred.com\",\"id\":\"0031F00000ClWARQA3\",\"name\":\"Steven Newman\"},{\"contactPageUrl\":\"https://newscred--abcm--newscred.cs90.visual.force.com/0031F00000MGRiaQAH\",\"email\":\"mohammad.faisal@newscred.com\",\"id\":\"0031F00000MGRiaQAH\",\"name\":\"Potato Maker\"}]}"
  
  return this.httpClient.post(url, body)
}


//Get Contact Tab Analytics
public getContactsAnalytics(){
  
  let url=`${this.newsCredConstants.baseUrl}/${NewsCredAPI.getContactsAnalyticsEndpoint}`
  let body= "{\"contacts\":[{\"contactPageUrl\":\"https://newscred--abcm--newscred.cs90.visual.force.com/0031F00000ClWARQA3\",\"email\":\"steven.newman@newscred.com\",\"id\":\"0031F00000ClWARQA3\",\"name\":\"Steven Newman\"},{\"contactPageUrl\":\"https://newscred--abcm--newscred.cs90.visual.force.com/0031F00000MGRiaQAH\",\"email\":\"mohammad.faisal@newscred.com\",\"id\":\"0031F00000MGRiaQAH\",\"name\":\"Potato Maker\"}]}"
  
  return this.httpClient.post(url, body)
}

//Get Content Tab Analytics
public getContentAnalytics(){
  
  let url=`${this.newsCredConstants.baseUrl}/${NewsCredAPI.getContentAnalyticsEndpoint}`
  let body= "{\"contacts\":[{\"contactPageUrl\":\"https://newscred--abcm--newscred.cs90.visual.force.com/0031F00000ClWARQA3\",\"email\":\"steven.newman@newscred.com\",\"id\":\"0031F00000ClWARQA3\",\"name\":\"Steven Newman\"},{\"contactPageUrl\":\"https://newscred--abcm--newscred.cs90.visual.force.com/0031F00000MGRiaQAH\",\"email\":\"mohammad.faisal@newscred.com\",\"id\":\"0031F00000MGRiaQAH\",\"name\":\"Potato Maker\"}]}"
  
  return this.httpClient.post(url, body)
}




  constructor(private httpClient: CustomHttpClient, @Inject('newsCredConstants') @Optional() private newsCredConstants?: any, @Inject('dynamicCRMInfo') @Optional() private dynamicCRMInfo?: DynamicCRMInfo) { 
  }

}
