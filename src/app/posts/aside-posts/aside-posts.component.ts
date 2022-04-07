import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/blog/auth.service';
import { Category } from '../category';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-aside-posts',
  templateUrl: './aside-posts.component.html',
  styleUrls: ['./aside-posts.component.scss']
})
export class AsidePostsComponent implements OnInit {

  posts: Observable<Post[]> | any;
  categories: Observable<Category[]> | any;

  constructor(
    private postService: PostService, 
    public auth: AuthService) { }

  ngOnInit(): void {
    this.categories = this.postService.getCategories();
  }

}
