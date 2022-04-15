import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/blog/auth.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {

  posts: Observable<Post[]> | any;

  term: any;
  loading = true;

  totalLength: any = 11;
  page: number = 1;

  constructor(private postService: PostService, 
    public auth: AuthService,
    private dialogService: DialogService,
    private afs: AngularFirestore,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const userId = this.auth.currentUserId;

    console.log(userId);
    this.posts = this.postService.getUserPosts();
    this.posts.subscribe((result: any) => {
      this.totalLength = result.length;
      console.log(result.length);
    });
  }

  delete(id: string) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this post?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.postService.delete(id);
      }
    });
  }

}
