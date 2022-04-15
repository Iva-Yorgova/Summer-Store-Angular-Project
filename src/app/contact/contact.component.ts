import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { DialogService } from 'src/app/shared/dialog.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  buttonText: string = 'Send';

  constructor(
    private contactService: ContactService,
    private dialogService: DialogService) { }

  name: string | any;
  email: string | any;
  message: string | any;
  
  ngOnInit(): void {
  }

  createContact() {
    const data = {      
      fullName: this.name,
      email: this.email,
      message: this.message,
      published: new Date(),     
    }
     this.contactService.createContact(data);
     console.log('contact created')
      this.name = '';
      this.email = '';
      this.message = '';
      this.dialogService.openContactDialog('Thank you for contacting with us! We will respond as soon as possible!');
  }

}
