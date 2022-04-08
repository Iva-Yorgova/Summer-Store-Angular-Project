import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../category';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-category-posts',
  templateUrl: './category-posts.component.html',
  styleUrls: ['./category-posts.component.scss']
})
export class CategoryPostsComponent implements OnInit {

  posts: Observable<Post[]> | any;
  categories: Observable<Category[]> | any;
  postsByCategory: Observable<Post[]> | any;
  category!: string | any;

  constructor(
    private postService: PostService, 
    private router: ActivatedRoute, 
    private route: ActivatedRoute) 
    { }

  ngOnInit(): void {
    this.categories = this.postService.getCategories();
    this.posts = this.postService.getPosts();

  //    this.router.queryParamMap.subscribe(queryParams => {
  //     this.category = queryParams.get("category");
  //     console.log(this.category);
  //     this.postsByCategory = this.postService.getPostsByCategory(this.category);
  //     console.log(this.postsByCategory);
  //     console.log('here');
  //  });
  
  }

 

}
