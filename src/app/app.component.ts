import { Component } from '@angular/core';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'contact-manager';
  public contactList: any[] = [];
  public contact: any = {
    name: '',
    lastname: '',
    email: '',
    telephone: null,
    contacted: false,
  };
  public error: boolean = false;
  public nameError: string = '';
  public emailError: string = '';
  public contactAllButtonPressed: boolean = false;
  public hideContacted: boolean = false;
  

  saveContact(contact: any) {
    if (
      this.contact.name.length > 6 &&
      !this.contactList.some((contact) => contact.email == this.contact.email)
    ) {
      this.contactList.push(contact);

      this.contact = {
        name: '',
        lastname: '',
        email: '',
        telephone: null,
        contacted: false,
      };
    }
  }

  eliminarContacto(task: any): void {
    this.contactList = this.contactList.filter(i => i != task)
  }
  eliminarTodo(): void {
    this.contactList = this.contactList.filter(i => i == '')
  }

  onBlur() {
    if (this.contact.name.length < 6) {
      this.nameError = 'Tu nombre tiene que tener más de 6 caracteres.';
      this.error = true;
    }

    if (this.contactList.some((contact) => contact.email === this.contact.email)) {
      this.emailError = 'Este correo ya esta registrado';
      this.error = true;
    }
    console.log(this.contactList.some((contact) => contact.email === this.contact.email))
  }
  onFocus() {
    this.nameError = '';
    this.emailError = '';
    this.error = false;
  }
  contactAll(){
    this.contactList.map(a=>a.contacted=true);
    this.contactAllButtonPressed = true;
    }
  undoContactAll(){
    this.contactList.map(a=>a.contacted=false);
    this.contactAllButtonPressed = false;
    }
  contacted(contact){
    contact.contacted = !contact.contacted
  }
  buttonHideContacted(){
      this.hideContacted = true
  }
  buttonShowContacted(){
      this.hideContacted = false}
  }