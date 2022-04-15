import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  buttonText: string = 'Send';
  form: FormGroup;

  constructor(
    private contactService: ContactService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  createContact() {
    console.log(this.form.value);
    const data = {      
      fullName: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      message: this.form.get('message')?.value,
      published: new Date(),     
    }
     this.contactService.createContact(data);
     console.log('contact created');
     this.form.reset();
     this.dialogService
    .openContactDialog('Thank you for contacting with us! We will respond as soon as possible!');
  }

  enableSendBtn(): boolean {
    return this.form.valid;
  }

}
