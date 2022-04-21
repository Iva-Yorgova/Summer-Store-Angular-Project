import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  posts: Observable<Post[]>;
  categories: Observable<Category[]>;
  postsByCategory: Observable<Post[]>;
  category!: string | any;
  count: number;
  res: number;

  term: any;

  constructor(
    private postService: PostService, 
    public auth: AuthService,
    private router: ActivatedRoute,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categories = this.postService.getCategories();
    this.posts = this.postService.getPosts();

     this.router.queryParamMap.subscribe(queryParams => {
      this.category = queryParams.get("category");
      console.log(this.category);
   });
  }

  showCategoryPosts(name: string) {
    this.posts = this.postService.getPostsByCategory(name);
  }
}
