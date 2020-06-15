import { Component } from '@angular/core';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'contact-manager';
  public contactList = JSON.parse(localStorage.getItem('contacts')) || [];
  public contactFilterList = JSON.parse(localStorage.getItem('contacts')) || [];
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
  public weekday = ['Monday', 'Tuesday', 'Wedeneday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augost', 'September', 'October', 'November', 'December'];
  public today = this.weekday[new Date().getDay()] + ', ' + new Date().getDate() + ' of ' + this.months[new Date().getMonth()] + ' of ' + new Date().getFullYear();
  public search = '';


  saveContact(contact: any) {
    if (
      this.contact.name.length > 4 &&
      !this.contactList.some((contact) => contact.email == this.contact.email) &&
      this.contact.lastname.length > 0 && this.contact.telephone != null &&
      this.contact.email.length != 0) {
      this.contactList.push(contact);
      this.contactFilterList.push(contact);
      localStorage.setItem('contacts', JSON.stringify(this.contactList));

      this.contact = {
        name: '',
        lastname: '',
        email: '',
        telephone: null,
        contacted: false,
      }
    } else {
      this.errortext = 'Tienes que rellenar todos los campos correctamente';
      this.onBlur();
    }
    if (this.contactList.every((contact) => contact.contacted === true)) {
      return this.contactAllButtonPressed = true;
    } else this.contactAllButtonPressed = false;
  }

  eliminarContacto(task: any): void {
    this.contactList = this.contactList.filter(i => i != task)
    this.contactFilterList = this.contactList.filter(i => i != task)
    localStorage.setItem('contacts', JSON.stringify(this.contactList));
  }
  eliminarTodo(): void {
    this.contactList = this.contactList.filter(i => i == '')
    this.contactFilterList = this.contactList.filter(i => i == '')
    localStorage.setItem('contacts', JSON.stringify(this.contactList));
  }

  onBlur() {
    if (this.contact.name.length <= 4) {
      this.nameError = 'Tu nombre tiene que tener más de 4 caracteres.';
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
  }
  onFocus() {
    this.nameError = '';
    this.lastnameError = '';
    this.emailError = '';
    this.phoneError = '';
    this.error = false;
  }
  contactAll() {
    this.contactList.map(a => a.contacted = true);
    this.contactAllButtonPressed = true;
  }
  undoContactAll() {
    this.contactList.map(a => a.contacted = false);
    this.contactAllButtonPressed = false;
  }
  contacted(contact) {
    contact.contacted = !contact.contacted;
    if (this.contactList.every((contact) => contact.contacted === true)) {
      return this.contactAllButtonPressed = true;
    }
  }
  filterContacts(n) {
    if (n === 1) {
      this.contactFilterList = this.contactList.filter(c => c);
    } else if (n === 2) {
      this.contactFilterList = this.contactList.filter(c => !c.contacted);
    } else if (n === 3) {
      this.contactFilterList = this.contactList.filter(c => c.contacted);
    } else {
      this.contactFilterList = this.contactList.filter(c => c.name.includes(this.search) || c.email.includes(this.search));
    }
  }
  resetForm() {
    this.nameError = '';
    this.lastnameError = '';
    this.emailError = '';
    this.phoneError = '';
    this.error = false;
    this.contact = {
      name: '',
      lastname: '',
      email: '',
      telephone: null,
      contacted: false,
    }
  }
}

