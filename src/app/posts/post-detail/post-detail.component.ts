import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/blog/auth.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  post: Post | any;
  editing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    public auth: AuthService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getPost();
    console.log(this)
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    return this.postService.getPostData(id).subscribe(data => this.post = data);
  }

  updatePost() {
    const formData = {
      title: this.post.title,
      content: this.post.content
    }
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.update(id!, formData);
    this.editing = false;
  }

  likePost() {
    const formData = {
      likes: this.post.likes + 1
    }
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.update(id!, formData);
    this.editing = false;
  }

  delete() {
    const id = this.route.snapshot.paramMap.get("id");
    this.dialogService.openConfirmDialog('Are you sure you want to delete this post?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.postService.delete(id);
        this.router.navigate(["/blog"]);
      }
    });
    
  }

}
