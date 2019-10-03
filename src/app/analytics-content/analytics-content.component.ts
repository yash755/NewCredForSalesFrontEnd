import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics-content',
  templateUrl: './analytics-content.component.html',
  styleUrls: ['./analytics-content.component.scss']
})
export class AnalyticsContentComponent implements OnInit {
  public static EngagementTabType = 1;
  public static ContactsTabType = 2;
  public static ContentTabType = 3;
  loggedInUser:string;
  selectedTab= 1;
  
  constructor() { }

  ngOnInit() {
  }
  checkActiveStage(tab)
  {
    this.selectedTab=tab;
    switch(tab) {
      case(AnalyticsContentComponent.EngagementTabType):
      this.loggedInUser = "";
        break;
      case(AnalyticsContentComponent.ContactsTabType):
      this.loggedInUser = "";
      break;
      case(AnalyticsContentComponent.ContentTabType):
      this.loggedInUser = "";
      break;
      default:
      
    }
  }
}
