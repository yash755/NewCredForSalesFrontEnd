import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';

@Component({
    selector: 'article-card-slider',
    templateUrl: './slider.html',
    styleUrls: ['./slider.css'],
  })
  export class ArticleCardSlider {
    @Input('articles') articles: any
    @Input('carouselId') carouselId: string
    @Output() searchSelectionChanged = new EventEmitter<any>();
    public selectedContents = [];
    constructor() { }
    ngOnInit() {
      console.log(this.articles);
    }
    handleCardStatusChanged(event:any){
      if (event.target.checked) 
      {
        this.selectedContents.push(event.value);
      } 
      if (!event.target.checked) 
      {
        let index = this.selectedContents.indexOf(event.value);
        if (index > -1) 
        {
          this.selectedContents.splice(index, 1);
        }
      }
      console.log(this.selectedContents)
      this.searchSelectionChanged.emit(this.selectedContents);
  
    }
}