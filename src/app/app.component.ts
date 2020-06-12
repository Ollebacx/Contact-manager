import { Component } from '@angular/core';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';

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
    contacted: false,
  };
  public error: boolean = false;
  public nameError: string = '';

  saveContact(contact: any) {
    if (this.contact.name.length > 6) {
      this.contactList.push(contact);

      this.contact = {
        name: '',
        lastname: '',
        email: '',
        telephone: null,
        contacted: false,
      }
    }
  }

  eliminarContacto(task: any): void {
    this.contactList = this.contactList.filter(i => i != task)
  }

  onBlur() {
    if (this.contact.name.length < 6) {
      this.nameError = 'Tu nombre tiene que tener más de 6 caracteres.';
      this.error = true;
    }
  }
  onFocus() {
    this.nameError = '';
    this.error = false;
  }

}


