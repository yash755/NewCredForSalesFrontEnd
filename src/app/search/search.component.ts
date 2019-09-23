import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NewsCredAPI } from '../../services/newsCredAPI'
import { Article } from '../model/article'

declare var $: any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  public loading: boolean
  public query: string
  public articles: Article[]
  public carouselEl: any
  public carouselId: string

  // @Output() searchSelectionChanged = new EventEmitter<string[]>();
  constructor(private apiService: NewsCredAPI) { 
    this.carouselId = "search-carousel"
    this.carouselEl = $('#'+this.carouselId);
  }
  
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

  forward(){
    this.carouselEl.trigger('next.owl.carousel');
  }
  backward()
  {
    this.carouselEl.trigger('prev.owl.carousel');
  }

  handleKeyDownInput(event) {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }

}
