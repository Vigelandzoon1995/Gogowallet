import Contact from "../../shared/models/contact.model";

export class EmergencyContactService {
    private contactsList: {contacts: Contact[]}[];
    list:any;
    addContact(contact){
        this.contactsList.push(contact);
        //Todo add function from services
    }

    deleteContact(contact){
        var index = this.contactsList.indexOf(contact);
        if(index != -1){
          //Todo add delete from services
          return this.contactsList.splice(index,1);   
        }
        else{
          return false;
        }
    }

    getAll(){
        this.contactsList = this.mockupData();
        return this.contactsList;
    }

    mockupData(){
    this.list = [
        {
          id: 1,
          user_id: 1,
          name: 'Rabobank',
          phone: '088 722 67 67',
          thumbnail: 'card',
          notes: ''
        },
        {
          id: 2,
          user_id: 1,
          name: 'ABN AMRO',
          phone: '0900 0024',
          thumbnail: 'card',
          notes: ''
        }
      ];
        return this.list;
    }
}