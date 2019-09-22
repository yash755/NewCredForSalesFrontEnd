import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NewsCredAPI } from '../../services/newsCredAPI'
import { Article } from '../model/article'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  public loading: boolean
  public query: string
  public articles: Article[]
  @Output() searchSelectionChanged = new EventEmitter<string[]>();
  constructor(private apiService: NewsCredAPI) { }
  
  ngOnInit() {
  }

  handleSearch() {
    this.loading = true;
    this.apiService.searchArticles(this.query)
    .subscribe(data => {
      this.articles = data.result_set;
      this.loading = false;
    });
  }

  handleKeyDownInput(event) {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }

}
