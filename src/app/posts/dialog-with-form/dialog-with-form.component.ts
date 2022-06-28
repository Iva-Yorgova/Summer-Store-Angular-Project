import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-dialog-with-form',
  templateUrl: './dialog-with-form.component.html',
  styleUrls: ['./dialog-with-form.component.scss'],
})
export class DialogWithFormComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogWithFormComponent>,
    public postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  text: string;

  ngOnInit(): void {}

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  onCansel(): void {
    this.dialogRef.close();
  }

  displayText(data: any) {
    //console.log(data.text);
    const formData = {
      text: data.text,
    };
    console.log('This is the text:', formData.text);
    this.postService.updateComment(data.id, formData);
    const id = this.route.snapshot.paramMap.get('id');
    this.router.navigate([`/blog/${id}`]);
    this.dialogRef.close();
  }
}
