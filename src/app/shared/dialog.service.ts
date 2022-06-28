import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { MatContactDialogComponent } from '../contact/mat-contact-dialog/mat-contact-dialog.component';
import { DialogWithFormComponent } from '../posts/dialog-with-form/dialog-with-form.component';
import { MatConfirmDialogComponent } from '../posts/mat-confirm-dialog/mat-confirm-dialog.component';
import { PostService } from '../posts/post.service';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog, private postService: PostService) {}

  comment: Comment;

  openConfirmDialog(msg: any) {
    return this.dialog.open(MatConfirmDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        message: msg,
      },
    });
  }

  // openFormDialog(msg: any) {
  //   return this.dialog.open(DialogWithFormComponent, {
  //     width: '700px',
  //     height: '500px',
  //     panelClass: 'confirm-dialog-container',
  //     disableClose: true,
  //     data: {
  //       message: msg,
  //     },
  //   });
  // }

  openFormDialog(comment: any, id: string) {
    //this.comment = this.postService.getComment(id);
    return this.dialog.open(DialogWithFormComponent, {
      width: '700px',
      height: 'auto',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        id: id,
        text: comment.text,
      },
    });
  }

  openContactDialog(msg: any) {
    return this.dialog.open(MatContactDialogComponent, {
      width: '430px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        message: msg,
      },
    });
  }
}
