import { Component, OnInit} from '@angular/core';
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

  posts: Observable<Post[]>;
  postsByCategory: Observable<Post[]>;
  categories: Observable<Category[]>;

  term: any;
  loading = true;

  totalLength: number;
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

    // this.postService.getCategories().forEach(c => {
    //   c.forEach(x => {
    //     console.log('category name is: ', x.name);
    //     console.log('category id is: ', x.id);
    //   })
    // });
  }

  getMyPosts(){
    this.posts = this.postService.getMyPosts();
  }

  delete(id: string) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this post?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.postService.delete(id);
      }
    });
  }

  showCategoryPosts(name: string) {
    this.posts = this.postService.getPostsByCategory(name);
    console.log(this.posts);
  }



}
