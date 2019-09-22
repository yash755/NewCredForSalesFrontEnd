import { Component,OnInit, Input} from '@angular/core';
import {NewsCredAPI} from '../../services/newsCredAPI';
import { Article } from '../model/article';
import dataSample from '../static/config.json';

declare var $: any;
@Component({
  selector: 'app-recommended-content',
  templateUrl: './recommended-content.component.html',
  styleUrls: ['./recommended-content.component.scss']
})
export class RecommendedContentComponent implements OnInit{
  @Input() selectedArticles:string[];
  carouselEl;
  articles:Article[];
  constructor(private apiService: NewsCredAPI) { }

  ngOnInit() {
    const recordId = 82348;
    const currentUserID = 717;
    this.apiService.getRecommendedArticles(recordId, currentUserID)
    .subscribe((data)=>{
      this.articles=data.result_set;
      this.carouselEl = $('.owl-carousel');
      this.selectedArticles=[];
    }, (err) => {
    });
    //console.log(dataSample[0].name);
  }
  forward()
  {
    this.carouselEl.trigger('next.owl.carousel');
  }
  backward()
  {
    this.carouselEl.trigger('prev.owl.carousel');
  }
  //Function added to copy store the selected links into an array
  onCheckboxChange(event, value) 
  {
    if (event.target.checked) 
    {
      this.selectedArticles.push(value);
    } 
    if (!event.target.checked) 
    {
      let index = this.selectedArticles.indexOf(value);
      if (index > -1) 
      {
        this.selectedArticles.splice(index, 1);
      }
    }
  }
}
