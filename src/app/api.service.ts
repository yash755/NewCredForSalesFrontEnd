import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public getRecommendedArticles():Observable<any>{
    const httpOptions = { headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization':'ABCM 8178c61b21134cadb5651ff2fc724caf'
  })
}
    return  this.httpClient.get('https://abcm.newscred.com/api/v2/articles/recommendation?account=NewsCred&field_values=%7B%22fieldName%22:%22Contact.Title%22%7D&industry=Entertainment&record_id=82348&user_id=717',httpOptions);
  }

  public getContentLibrary():Observable<any>{
    const httpOptions = { headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization':'ABCM 8178c61b21134cadb5651ff2fc724caf'
  })
 }
    return  this.httpClient.get('https://abcm.newscred.com/api/v1/categories/articles?guid=80fa0ed7937848d084a19915c1528165',httpOptions);
}

public getArticleCategories():Observable<any>{
  const httpOptions = { headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization':'ABCM 8178c61b21134cadb5651ff2fc724caf'
})
}
  return  this.httpClient.get('https://abcm.newscred.com/api/v1/categories?email=mohammad.faisal@newscred.com',httpOptions);
}

public getArticleBasedOnCategory(guid):Observable<any>{
  const httpOptions = { headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization':'ABCM 8178c61b21134cadb5651ff2fc724caf'
})
}
  return  this.httpClient.get('https://abcm.newscred.com/api/v1/categories/articles?guid='+guid,httpOptions);
}

  constructor(private httpClient: HttpClient) { }
}
