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
  public error: boolean = false;
  public nameError: string = '';
  saveContact(contact : any){
    if (this.contact.name.length > 6){
    this.contactList.push(contact);

    this.contact = {
      name: '',
      lastname: '',
      email: '',
      telephone: null,
    } 
  }

  }
  onBlur(){
    if (this.contact.name.length < 6){
      this.nameError = 'Tu nombre tiene que tener más de 6 caracteres.';
      this.error = true;
    }
  }
  onFocus(){
      this.nameError = '';
      this.error = false;
    }
  }
