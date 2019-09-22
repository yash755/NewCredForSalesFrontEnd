import { Injectable, Optional, Inject } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {CustomHttpClient} from '../http.service';
import {DynamicCRMInfo} from '../dynamicCRM';
import { ArticleCategories } from '../../app/model/ArticleCategories';

@Injectable({
  providedIn: 'root'
})
export class NewsCredAPI {
  static articleEndpoint = "v2/articles/recommendation"
  static articleCategoryEndpoint = "v1/categories/articles"
  static categoryEndpoint = "v1/categories"
  static recommendedArticlesEndpoint = "v2/articles/recommendation"
  static searchEndpoint = "v1/articles/search"

  public getRecommendedArticles(recordId: number, userId: number ):Observable<any>{
    const field_values = {"fieldName":"Contact.Title"};
    let url = `${this.newsCredConstants.baseUrl}/${NewsCredAPI.recommendedArticlesEndpoint}`
    let params = {
      account: this.dynamicCRMInfo.contact.accountName,
      ...field_values,
      industry: this.dynamicCRMInfo.contact.industry,
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
    email: this.dynamicCRMInfo.currentUser
  }
  return  this.httpClient.get(url,params);
}

public searchArticles(query: string):Observable<any>{
  let url = `${this.newsCredConstants.baseUrl}/${NewsCredAPI.searchEndpoint}`
  let params = {
    contact_email: this.dynamicCRMInfo.contact.email,
    query,
    user_email: this.dynamicCRMInfo.getCurrentUser().email
  }
  return this.httpClient.get(url, params)
}
  constructor(private httpClient: CustomHttpClient, @Inject('newsCredConstants') @Optional() private newsCredConstants?: any, @Inject('dynamicCRMInfo') @Optional() private dynamicCRMInfo?: DynamicCRMInfo) { }
}
