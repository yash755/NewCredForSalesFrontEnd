import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'article-card',
    templateUrl: './card.html',
    styleUrls: ['./card.css'],
  })
  export class ArticleCard {
    @Input('article') article: any
    @Output() cardStatusChanged = new EventEmitter<any>();

    constructor() { }
    ngOnInit() {
        console.log("this is article acard")
        console.log(this.article)
    }

    onCheckboxChange(event:any, value: any) {
        event.preventDefault()
        this.cardStatusChanged.emit({target: event.target, value:value});
    }
}