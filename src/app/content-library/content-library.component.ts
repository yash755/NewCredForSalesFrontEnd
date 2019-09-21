import { Component,OnInit, Input} from '@angular/core';
import {ApiService} from '../api.service';
import { Article } from '../model/article';
import {ArticleCategories} from '../model/ArticleCategories';
declare var $: any;

@Component({
  selector: 'app-content-library',
  templateUrl: './content-library.component.html',
  styleUrls: ['./content-library.component.scss']
})
export class ContentLibraryComponent implements OnInit {
  @Input() selectedContents:string[];
  carouselEl;
  selectCategoryName = 'NewsCred Expertise';
  articles:Article[];
  categories:ArticleCategories[];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getContentLibrary().subscribe((data)=>{
      this.articles=data;
      this.carouselEl = $('.owl-carousel');
      this.selectedContents=[];
    }, (err) => {
    });

    this.getArticleCategories();
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
      this.selectedContents.push(value);
    } 
    if (!event.target.checked) 
    {
      let index = this.selectedContents.indexOf(value);
      if (index > -1) 
      {
        this.selectedContents.splice(index, 1);
      }
    }
  }

  getArticleCategories()
  {
    this.apiService.getArticleCategories().subscribe((data)=>{
    this.categories=data;
    //this.carouselEl = $('.owl-carousel');
    console.log(this.categories);   
    }, (err) => {
  });
  }

  getArticlesBasedOnCategory(guid, name)
  {
    this.selectCategoryName = name;
    this.apiService.getArticleBasedOnCategory(guid).subscribe((data)=>{
      this.articles=data;
      console.log(this.articles);   
      }, (err) => {
    });
  }
}
