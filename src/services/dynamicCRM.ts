import {Injectable, Inject, Optional} from '@angular/core';

@Injectable()
export class DynamicCRMInfo {
    public defaultData = {
        contact: {
            accountName: 'NewsCred',
            email: 'nazish@binmile.com',
            id: '00000123',
            industry: '',
            name: 'Mohd Nazish'
            },
            currentUserEmail: 'padmaja@newscred.com',
            currentUserName: 'Padmaja Shukla',
            isProd:true
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
            this.defaultData.currentUserEmail=internalemailaddress;
            this.defaultData.currentUserName=fullname;
            
            return {
            name: fullname,
            email: internalemailaddress
            } 
        }
    }

    //Nazish - Getting current record details from dynamics 365
    getCurrectRecord()
    {

        let name="";
        let email="";
        let contactId="";
        let recordName="";
        let parentXrm=(<any>window.parent).Xrm;
        let entityName = parentXrm.Page.data.entity.getEntityName();
        let currentRecord=parentXrm.Page.data.entity.getId().replace("{", "").replace("}", "");

        if(entityName=="contact")
        {
            if(parentXrm.Page.getAttribute("firstname")!=undefined && parentXrm.Page.getAttribute("firstname")!=null && parentXrm.Page.getAttribute("firstname")!="")
            {
              name+=parentXrm.Page.getAttribute("firstname").getValue();  
            }
            if(parentXrm.Page.getAttribute("lastname")!=undefined && parentXrm.Page.getAttribute("lastname")!=null && parentXrm.Page.getAttribute("lastname")!="")
            {
              name+=" "+parentXrm.Page.getAttribute("lastname").getValue();
            }
            if(parentXrm.Page.getAttribute("emailaddress1")!=undefined && parentXrm.Page.getAttribute("emailaddress1")!=null && parentXrm.Page.getAttribute("emailaddress1")!="")
            {
                email=parentXrm.Page.getAttribute("emailaddress1").getValue();
            }
            recordName=name;
            this.defaultData.contact.id=currentRecord;
        }


        else if(entityName=="opportunity")
        {
            if(parentXrm.Page.getAttribute("parentcontactid").getValue()!=undefined && parentXrm.Page.getAttribute("parentcontactid").getValue()!=null && parentXrm.Page.getAttribute("parentcontactid").getValue()!="")
            {
                name=parentXrm.Page.getAttribute("parentcontactid").getValue()[0].name;
                contactId=parentXrm.Page.getAttribute("parentcontactid").getValue()[0].id.replace("{", "").replace("}", "");
            }
            if(parentXrm.Page.getAttribute("name")!=undefined && parentXrm.Page.getAttribute("name")!=null && parentXrm.Page.getAttribute("name")!="")
            {
                recordName=parentXrm.Page.getAttribute("name").getValue();
            }
        }


        else if(entityName=="account")
        {
            if(parentXrm.Page.getAttribute("name")!=undefined && parentXrm.Page.getAttribute("name")!=null && parentXrm.Page.getAttribute("name")!="")
            {
               name= parentXrm.Page.getAttribute("name").getValue();
            }
            if(parentXrm.Page.getAttribute("emailaddress1")!=undefined && parentXrm.Page.getAttribute("emailaddress1")!=null && parentXrm.Page.getAttribute("emailaddress1")!="")
            {
                email=parentXrm.Page.getAttribute("emailaddress1").getValue();
            }
        }
        this.defaultData.contact.email=email;
        this.defaultData.contact.name=name;
        return{
            id:currentRecord,
            contactId:contactId,
            entityType:entityName,
            recordName:recordName
        }
    }
    
    //Nazish - Updating activity while copying the record
    updateActivity(regards, subject, description)
    {
        let parentXrm=(<any>window.parent).Xrm;
        let entity = {
        subject: subject,
        description: description,
        ["regardingobjectid_contact@odata.bind"]: "/contacts("+regards+")",
        ncs_relatedto:"newscred"
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
  //Nazish - opening the email form on click on send as email button
  sendEmail(emailBody)
  {
    let subject="Hey "+this.defaultData.contact.name;
    let start="Hello "+this.defaultData.currentUserName+",<br><br>Check these articles hand-picked by our staff editors specially for you.<br><br>";
    let end="<br><br>Let me know what do you think. I am just one email away!<br><br>Regards-<br>"+this.getCurrentUser().name;

    let description=start+emailBody+end;
    let parentXrm=(<any>window.parent).Xrm;
    
    let toContact = [];
    toContact[0] = new Object();
    toContact[0].id = this.getCurrectRecord().id;
    toContact[0].name = this.getCurrectRecord().recordName;;
    toContact[0].entityType = "contact";

    let regarding=[];
    regarding[0]=new Object();
    regarding[0].id=this.getCurrectRecord().id;
    regarding[0].name=this.getCurrectRecord().recordName;
    regarding[0].entityType=this.getCurrectRecord().entityType;

    let parameters=[];
    parameters["to"]=toContact;
    parameters["description"]=description;
    parameters["subject"]=subject;
    parameters["regardingobjectid"]=regarding;
    parameters["ncs_relatedto"]="newscred";
    parentXrm.Utility.openEntityForm("email", null,parameters);
  }
    constructor() {
        if(this.defaultData.isProd)
        {
            this.getCurrectRecord();
            this.getCurrentUser();
        }
    }
}
