import {Injectable} from '@angular/core';

@Injectable()
export class DynamicCRMInfo {
    public contact = {
        accountName: 'NewsCred',
        email: 'thecontact@devnewscred.com',
        id: '0035500000VR3naAAD',
        industry: '',
        name: 'The Contact'
    }
    public currentUser: string
    public getCurrentUser() {
        return {
          name: this.data.currentUserName,
          email: this.data.currentUserEmail
        }
    }
    public data: any
    constructor(data:any, currentUser: string, contact: any) {
        this.currentUser = currentUser || 'currentUserEmail@newscred.com'
    }
}
