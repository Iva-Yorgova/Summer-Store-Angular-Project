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
  styleUrls: ['./aside-posts.component.scss'],
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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categories = this.postService.getCategories();
    this.posts = this.postService.getPosts();

    // this.router.queryParamMap.subscribe((queryParams) => {
    //   this.category = queryParams.get('category');
    //   console.log('The category from params is:', this.category);
    // });

    // this.postService.getPostsByCategory('Design').subscribe((result: any) => {
    //   this.count = result.length;
    //   console.log('The Design posts are:', this.count);
    //   return result.length;
    // });

    // console.log('The number is: ', this.showCategoryPosts('Design'));
  }

  showCategoryPosts(name: string) {
    this.postService.getPostsByCategory(name).subscribe((result: any) => {
      this.count = result.length;
      console.log('From aside comp. This count is:', this.count);
      return result.length;
    });
  }
}
