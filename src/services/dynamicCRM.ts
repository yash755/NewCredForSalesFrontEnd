import {Injectable} from '@angular/core';


@Injectable()
export class DynamicCRMInfo {
    public defaultData = {
        contact: {
            accountName: 'NewsCred',
            email: 'thecontact@devnewscred.com',
            id: '0035500000VR3naAAD',
            industry: '',
            name: 'The Contact'
            },
            currentUserEmail: 'currentUserEmail@newscred.com',
            currentUserName: 'User User'
        }
    public currentUser: string
    //Nazish - Fetching current user details from dynamics 365
    public getCurrentUser() {
       let fullname="";
       let internalemailaddress="";
       let loggedInUserId="";

        let context=Xrm.Utility.getGlobalContext();
        loggedInUserId=context.userSettings.userId.replace("{", "").replace("}", "");
        let parentXrm=(<any>window.parent).Xrm;

        var req = new XMLHttpRequest();
        req.open("GET", parentXrm.Page.context.getClientUrl() + "/api/data/v9.1/systemusers("+loggedInUserId+")?$select=fullname,internalemailaddress", false);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function() {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 200) {
                    var result = JSON.parse(this.response);
                     fullname = result["fullname"];
                     internalemailaddress = result["internalemailaddress"];
                } else {
                    parentXrm.Utility.alertDialog(this.statusText);
                }
            }
        };
        req.send();

        if(fullname!="" && internalemailaddress!="")
        {
            return {
            name: fullname,
            email: internalemailaddress
            } 
        }
        else
        {
            return{
            name: this.defaultData.currentUserName,
            email: this.defaultData.currentUserName
            }
        }
    }

    getCurrectRecord()
    {
        let name="";
        let email="";
        let parentXrm=(<any>window.parent).Xrm;
        let entityName = parentXrm.Page.data.entity.getEntityName();
    }
    
    updateActivity(subject, description)
    {
        let parentXrm=(<any>window.parent).Xrm;
        let entity = {
        subject: subject,
        description: description
        }

        let req = new XMLHttpRequest();
        req.open("POST", parentXrm.Page.context.getClientUrl() + "/api/data/v9.1/tasks", false);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function() {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 204) {
                    var uri = this.getResponseHeader("OData-EntityId");
                    var regExp = /\(([^)]+)\)/;
                    var matches = regExp.exec(uri);
                    var newEntityId = matches[1];
                } else {
                    parentXrm.Utility.alertDialog(this.statusText);
                }
            }
        };
        req.send(JSON.stringify(entity));	
    }

    public data: any
    constructor(data:any, currentUser: string) {
        this.currentUser = currentUser || 'currentUserEmail@newscred.com';
        this.data = this.data || this.defaultData;
    }
}
