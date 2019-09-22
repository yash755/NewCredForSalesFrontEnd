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
    public getCurrentUser() {
        return {
          name: this.data.currentUserName,
          email: this.data.currentUserEmail
        }
    }

    public data: any
    constructor(data:any, currentUser: string) {
        this.currentUser = currentUser || 'currentUserEmail@newscred.com';
        this.data = this.data || this.defaultData;
    }
}
