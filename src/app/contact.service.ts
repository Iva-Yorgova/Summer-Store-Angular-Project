import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Contact } from './contact/contact';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactsCollection: AngularFirestoreCollection<Contact>;

  constructor(private afs: AngularFirestore) {
    this.contactsCollection = this.afs.collection('contacts', ref => 
    ref.orderBy('fullName', 'desc'));
   }

  //  getContacts() {
  //   return this.contactsCollection.snapshotChanges().pipe(delay(1000), map((actions) => {
  //     return actions.map(a => {
  //       const data = a.payload.doc.data() as Contact;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     })
  //   }))
  // }

  createContact(data: Contact) {
    this.contactsCollection.add(data);
  }
}
