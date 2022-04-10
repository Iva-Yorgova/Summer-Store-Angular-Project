import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/blog/auth.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { Post } from '../post';
import { PostService } from '../post.service';
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts: Observable<Post[]> | any;
  postsByCategory: Observable<Post[]> | any;
  term: any;
  isLoading: boolean = true;

  constructor(
    private postService: PostService, 
    public auth: AuthService,
    private dialogService: DialogService) { }

  ngOnInit(): void { 
    this.posts = this.postService.getPosts();
    this.isLoading = false;
  }

  delete(id: string) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this post?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.postService.delete(id);
      }
    });
  }

  categoryPosts(name: string) {
    this.postsByCategory = this.postService.getPostsByCategory(name);
  }


}
