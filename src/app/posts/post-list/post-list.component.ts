import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/blog/auth.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { Post } from '../post';
import { PostService } from '../post.service';
import { FilterPipe } from '../filter.pipe';
import { AngularFirestore } from 'angularfire2/firestore';
import { finalize } from 'rxjs/operators';
import { Category } from '../category';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy, OnChanges {

  posts: Observable<Post[]> | any;
  postsByCategory: Observable<Post[]> | any;
  categories: Observable<Category[]> | any;

  term: any;
  loading = true;

  constructor(
    private postService: PostService, 
    public auth: AuthService,
    private dialogService: DialogService,
    private afs: AngularFirestore) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnDestroy(): void {
    console.log('on destroy');
  }

  ngOnInit(): void { 
    this.posts = this.postService.getPosts();
    this.categories = this.postService.getCategories();
    console.log('on init');
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
