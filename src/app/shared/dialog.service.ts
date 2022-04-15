import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatContactDialogComponent } from '../contact/mat-contact-dialog/mat-contact-dialog.component';
import { MatConfirmDialogComponent } from '../posts/mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg: any) {
    return this.dialog.open(MatConfirmDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        message: msg
      }
    });
  }

  openContactDialog(msg: any) {
    return this.dialog.open(MatContactDialogComponent, {
      width: '430px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        message: msg
      }
    });
  }
}
