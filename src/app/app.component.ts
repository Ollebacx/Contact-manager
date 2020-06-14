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
  public lastnameError: string = '';
  public emailError: string = '';
  public phoneError: string = '';
  public errortext: string = '';
  public contactAllButtonPressed: boolean = false;
  public hideContacted: boolean = false;  

  saveContact(contact: any) {
    if (
      this.contact.name.length > 6 &&
      !this.contactList.some((contact) => contact.email == this.contact.email) &&
      this.contact.lastname.length > 3 && this.contact.telephone != null &&
      this.contact.email.length > 3
    ) {
      this.contactList.push(contact);

      this.contact = {
        name: '',
        lastname: '',
        email: '',
        telephone: null,
        contacted: false,
      } 
    } else{
      this.errortext = 'Tienes que rellenar todos los campos correctamente'
    }
    if (this.contactList.every((contact)=> contact.contacted === true)){
      return this.contactAllButtonPressed = true;
    } else this.contactAllButtonPressed = false;
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
    if (this.contact.email.length < 6) {
      this.emailError = 'Este campo debe de tener más de 6 caracteres.';
      this.error = true;
    }
    if (this.contact.telephone === null) {
      this.phoneError = 'Este campo no puede quedar vacío.';
      this.error = true;
    }
    if (this.contact.lastname.length < 1) {
      this.lastnameError = 'Este campo no puede quedar vacío.';
      this.error = true;
    }
    console.log(this.contactList.some((contact) => contact.email === this.contact.email))
  }
  onFocus() {
    this.nameError = '';
    this.lastnameError = '';
    this.emailError = '';
    this.phoneError = '';
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
    contact.contacted = !contact.contacted;
    if (this.contactList.every((contact)=> contact.contacted === true)){
      return this.contactAllButtonPressed = true;
    }
  }
  buttonHideContacted(){
      this.hideContacted = true
  }
  buttonShowContacted(){
      this.hideContacted = false}
  }