import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'article-card',
    templateUrl: './card.html',
    styleUrls: ['./card.css'],
    // encapsulation : ViewEncapsulation.None
  })
  export class ArticleCard {
    @Input() article: any
    @Output() cardStatusChanged = new EventEmitter<string[]>();

    constructor() { }
    ngOnInit() {
    }
    onCheckboxChange(event:any) {
        this.cardStatusChanged.emit(this.article);
    }
}