import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'contact-manager';
  public contactList: any[] = [];
  public contact: any = {
    name: '',
    lastname: '',
    email: '',
    telephone: null,
  };

  saveContact(contact : any){

    this.contactList.push(contact);

    this.contact = {
      name: '',
      lastname: '',
      email: '',
      telephone: null,
    };  }
  
}
//Comentario: Pueba 1