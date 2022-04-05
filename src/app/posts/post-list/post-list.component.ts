import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/blog/auth.service';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts: Observable<Post[]> | any;

  constructor(private postService: PostService, public auth: AuthService) {

   }

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
  }

  delete(id: string) {
    this.postService.delete(id);
  }

}
