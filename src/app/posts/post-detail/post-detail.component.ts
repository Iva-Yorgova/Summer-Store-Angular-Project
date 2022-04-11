import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/blog/auth.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { Post } from '../post';
import { PostService } from '../post.service';
import { Comment } from '../comment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  comments: Observable<Comment[]> | any;

  post: Post | any;
  editing: boolean = false;
  title: string | any;
  image: string | any;
  content: string | any;
  likes: number = 0;
  category: string | any;
  comment: string | any;

  postComment: Comment | any;
  text: string | any;
  commentLikes: number | any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    public auth: AuthService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getPost();
    this.getPostComments();
    this.comments = this.getPostComments();
    this.getUserData();
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    const result =  this.postService.getPostData(id)
    .subscribe(data => this.post = data);
    return result;
  }

  getPostComments() {
    const id = this.route.snapshot.paramMap.get('id');
    const result =  this.postService.getCommentsByPostId(id)
    .subscribe(data => this.comments = data);
    return result;
  }

  getUserData() {
    const user = this.auth.currentUserId;
    return user;
  }

  updatePost() {
    const formData = {
      title: this.post.title,
      content: this.post.content,
      category: this.post.category
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

  addComment() {
    const id = this.route.snapshot.paramMap.get('id');
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      postId: id,
      text: this.text,
      published: new Date(),
      likes: 1,
    }
    this.postService.createComment(data);
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
