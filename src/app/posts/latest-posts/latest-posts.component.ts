import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.scss'],
})
export class LatestPostsComponent implements OnInit {
  posts!: Array<Post>;
  sub: any;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sub = this.postService
      .getPosts()
      .subscribe((data) => (this.posts = data.slice(0, 5)));
  }
}
