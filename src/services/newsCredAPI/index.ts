import { Injectable, Optional, Inject } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {CustomHttpClient} from '../http.service';
import {DynamicCRMInfo} from '../dynamicCRM';
import { ArticleCategories } from '../../app/model/ArticleCategories';

@Injectable({
  providedIn: 'root'
})
export class NewsCredAPI {
  static getContactIdEndpoint = "v1/salesforce/contacts/0031F00000MGRiaQAH"
  static getLoggedInUserEndpoint = "v1/salesforce/users"
  static getFieldNameEndpoint = "v1/salesforce/contacts/field_names"

  static articleEndpoint = "v2/articles/recommendation"
  static articleCategoryEndpoint = "v1/categories/articles"
  static categoryEndpoint = "v1/categories"
  static recommendedArticlesEndpoint = "v2/articles/recommendation"
  static searchEndpoint = "v1/articles/search"

  static usedArticleEndpoint="v1/articles"
   
  fields=[]
  public getRecommendedArticles(recordId: number, userId: number ):Observable<any>{
    const field_values = {"fieldName":"Contact.Title"};
    let url = `${this.newsCredConstants.baseUrl}/${NewsCredAPI.recommendedArticlesEndpoint}`
    let params = {
      account: this.dynamicCRMInfo.data.contact.accountName,
      ...field_values,
      industry: this.dynamicCRMInfo.data.contact.industry,
      record_id: recordId,
      user_id: userId
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
    contact_email: this.dynamicCRMInfo.data.contact.email,
    query,
    user_email: this.dynamicCRMInfo.defaultData.currentUserEmail
  }
  console.log(params.contact_email+"  "+params.user_email);
  return this.httpClient.get(url, params)
}

//Nazish - fetching the contact id from NewsCred
public getRecordIdFromNewsCred(){
 let url=`${this.newsCredConstants.baseUrl}/${NewsCredAPI.getContactIdEndpoint}`
 let params = {
  contact_email: this.dynamicCRMInfo.defaultData.contact.email,
  contact_name: this.dynamicCRMInfo.defaultData.contact.name
    }
 return this.httpClient.get(url, params)
}

//Nazish - Getting current loggedIn user Id from NewsCred
public getCurrentUserIdFromNewsCred(){
let url=`${this.newsCredConstants.baseUrl}/${NewsCredAPI.getLoggedInUserEndpoint}/${this.dynamicCRMInfo.defaultData.currentUserEmail}`
return this.httpClient.get(url,"")
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
  constructor(private httpClient: CustomHttpClient, @Inject('newsCredConstants') @Optional() private newsCredConstants?: any, @Inject('dynamicCRMInfo') @Optional() private dynamicCRMInfo?: DynamicCRMInfo) { 
    //this.getFieldNames();
  }
}
