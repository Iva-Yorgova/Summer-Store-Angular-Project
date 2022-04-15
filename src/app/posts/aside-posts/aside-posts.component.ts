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

  posts: Observable<Post[]> | any;
  categories: Observable<Category[]> | any;
  postsByCategory: Observable<Post[]> | any;
  category!: string | any;
  count: number;
  res: number;

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

      console.log(this.postsByCategory);
      console.log('here');
   });
  }

  showCategoryPosts(name: string) {
    this.posts = this.postService.getPostsByCategory(name);
  }
}
