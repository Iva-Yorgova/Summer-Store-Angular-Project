import { AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/blog/auth.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { Post } from '../post';
import { PostService } from '../post.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Category } from '../category';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit  {

  posts: Observable<Post[]> | any;
  postsByCategory: Observable<Post[]> | any;
  categories: Observable<Category[]> | any;

  term: any;
  loading = true;

  totalLength: any = 11;
  page: number = 1;

  constructor(
    private postService: PostService, 
    public auth: AuthService,
    private dialogService: DialogService,
    private afs: AngularFirestore) { }

  ngOnInit(): void { 

    this.posts = this.postService.getPosts();
    this.categories = this.postService.getCategories();
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

  categoryPosts(name: string) {
    this.postsByCategory = this.postService.getPostsByCategory(name);
  }

  showCategoryPosts(name: string) {
    this.posts = this.postService.getPostsByCategory(name);
    console.log(this.posts);
  }



}
