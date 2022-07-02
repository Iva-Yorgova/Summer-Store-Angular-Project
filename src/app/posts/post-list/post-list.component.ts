import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts: Observable<Post[]>;
  postsByCategory: Observable<Post[]>;
  categories: Observable<Category[]>;

  categoryId: string;
  categoryPosts: number;

  post: Post | any;

  term: any;
  loading = true;

  totalLength: number;
  page: number = 1;

  constructor(
    private postService: PostService,
    public auth: AuthService,
    private dialogService: DialogService,
    private afs: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
    this.categories = this.postService.getCategories();
    this.posts.subscribe((result: any) => {
      this.totalLength = result.length;
      console.log(result.length);
    });

    this.postService.getCategories().forEach((c) => {
      c.forEach((x) => {
        console.log('category name is: ', x.name);
        console.log('category id is: ', x.id);
      });
    });
  }

  getMyPosts() {
    this.posts = this.postService.getMyPosts();
  }

  delete(id: string) {
    let postData: Post;

    this.afs
      .doc(`/posts/${id}`)
      .get()
      .subscribe((snap) => {
        const data = snap.data() as Post;
        postData = data;
        console.log('This is post Data: ', postData);
      });

    this.dialogService
      .openConfirmDialog('Are you sure you want to delete this post?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.postService.delete(id);

          this.postService.getCategories().forEach((c) => {
            c.forEach((x) => {
              if (x.name == postData.category) {
                this.categoryId = x.id;
                this.categoryPosts = x.posts;
              }
            });
          });

          this.afs
            .doc(`/categories/${this.categoryId}`)
            .get()
            .subscribe((snap) => {
              console.log(snap.id);
              console.log(' this is the Category data:', snap.data());
              const data = snap.data() as Category;
              const doc = this.afs.doc(`/categories/${this.categoryId}`);

              doc.update({
                posts: this.categoryPosts - 1,
              });
            });
        }
      });
  }

  showCategoryPosts(name: string) {
    this.posts = this.postService.getPostsByCategory(name);
    console.log(this.posts);
  }
}
