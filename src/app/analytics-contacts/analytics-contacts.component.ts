import { Component, OnInit } from '@angular/core';
import { NewsCredAPI } from '../../services/newsCredAPI';

import { zip } from "rxjs";

@Component({
  selector: 'app-analytics-contacts',
  templateUrl: './analytics-contacts.component.html',
  styleUrls: ['./analytics-contacts.component.scss']
})
export class AnalyticsContactsComponent implements OnInit {
  rows: any = [];
  fetchingData: boolean;
  columns: any = [];
  constructor(private apiService: NewsCredAPI) { }

  ngOnInit() {
    zip(this.apiService.getContactsAnalytics())
      .subscribe(([response]) => {
       
        debugger
        this._formatTableData(response.result_set);
      }, (err) => { alert("error")
    });

  }
  
    _formatTableData(response)
    {
     
      this.rows = []
      this.columns =[]
      var maxRows =0;
      for (var i = 0; i < response.length; i++) {
        var contact = response[i];
        if (contact.contacts && contact.contacts.length > maxRows) {
          debugger
          maxRows = contact.contacts.length;
        
          var columnName = contact['contact_group_title'];
          this.columns.push(columnName);
        }
        let count = 0;
        for (var i = 0; i < maxRows; i++) {
          var row  = [];
          for (var j = 0; j < response.length; j++) {
            var contact = response[j];
            
            if (contact.contacts && i < contact.contacts.length) {
              row.push(contact.contacts[i]);
              contact.contacts[i].contact_page_url = "https://newscred.crm.dynamics.com/main.aspx?pagetype=entityrecord&etn=contact&id=28c35510-43da-e911-a84b-000d3a4f63e8";
              if (contact.contacts[i].sent_contents.length === 0) {
                contact.contacts[i].hasNoContent = true;
              }
            } else {
              row.push({id: count++});
            }
          }
          this.rows.push(row);
        }


      }
    }

}
