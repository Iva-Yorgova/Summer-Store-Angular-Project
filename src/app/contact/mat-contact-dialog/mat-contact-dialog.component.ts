import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-contact-dialog',
  templateUrl: './mat-contact-dialog.component.html',
  styleUrls: ['./mat-contact-dialog.component.scss']
})
export class MatContactDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<MatContactDialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

}
