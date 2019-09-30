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
  public isMessageVisible:boolean
  @Output() searchSelectionChanged = new EventEmitter<any>();
  constructor(private apiService: NewsCredAPI) { 
    this.carouselId = "search-carousel"
  }
  
  ngOnInit() {
    
  }

  handleSearch() {
    
    this.loading = true;
    this.apiService.searchArticles(this.query)
    .subscribe(data => {
      this.articles = data.result_set;
      this.loading = false;
      console.log(this.carouselEl)
    });
  }

  forward(){
    $('.' + this.carouselId).trigger('next.owl.carousel');
  }
  backward()
  {
    $('.' + this.carouselId).trigger('prev.owl.carousel');
  }

  handleSelectionChange(event){
    this.searchSelectionChanged.emit(event);
  }

  handleKeyDownInput(event) {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }

}
