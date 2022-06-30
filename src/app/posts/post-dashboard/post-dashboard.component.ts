import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { AuthService } from 'src/app/blog/auth.service';
import { PostService } from '../post.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Category } from '../category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Post } from '../post';
import tinymce from 'tinymce';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss'],
})
export class PostDashboardComponent implements OnInit {
  categories: Observable<Category[]>;
  posts: Observable<Post[]>;

  categoriesCollection: AngularFirestoreCollection<Category>;

  categoriesArray: Observable<Category[]>;
  currentCategoryArray: Observable<Category[]>;
  ctgrsArrayLength: number;
  postsByCategory: Observable<Post[]>;

  cat: Category | any;
  catPosts: number | any;
  itemDoc: AngularFirestoreDocument<Category>;
  form: FormGroup;

  constructor(
    private auth: AuthService,
    private postService: PostService,
    private storage: AngularFireStorage,
    private router: Router,
    private afs: AngularFirestore,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
      category: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.categoriesCollection = this.afs.collection('categories', (ref) =>
      ref.orderBy('name', 'asc')
    );
  }

  result: { id: string; postsNum: number };

  categoryId: string;
  catName: string;
  categoryPosts: number | any;

  title: string | any;
  image: string | any;
  content: string | any;
  likes: number = 0;
  category: string;
  comments: string[] | any;
  userLikes: any;

  buttonText: string = 'Create Post';

  uploadPercent: Observable<number> | any;
  downloadURL: Observable<string> | undefined;

  ngOnInit(): void {
    this.categories = this.postService.getCategories();
    console.log(this.categories);

    this.categoriesArray = this.afs
      .collection('categories')
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return snaps.map((snap) => {
            const data = snap.payload.doc.data() as Category;
            const id = snap.payload.doc.id;
            console.log(data.name);
            return { id, ...data };
          });
        })
      );
  }

  createPost() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      // content: tinymce.activeEditor.getContent({ format: 'text' }),
      content: this.content,
      image: this.image,
      published: new Date(),
      title: this.title,
      likes: this.likes,
      category: this.category,
      comments: 0,
      usersLikes: new Array<string>(),
    };

    const categoryData = {
      name: this.category,
      posts: 1,
      published: new Date(),
    };

    // var myContent = tinymce.activeEditor.getContent({ format: 'text' });
    // console.log('This is the editor content: ', myContent);

    this.postsByCategory = this.postService.getPostsByCategory(this.category);
    this.postsByCategory.subscribe((result: any) => {
      this.catPosts = result.length;
      console.log('The number of posts by category is:', this.catPosts);
    });

    this.currentCategoryArray = this.categories.pipe(
      map((ctgrs) => ctgrs.filter((ctgr) => ctgr.name == data.category))
    );

    this.currentCategoryArray.subscribe((result: any) => {
      this.ctgrsArrayLength = result.length;
      console.log('ctgrsArrLength is:', result.length);

      if (result.length == 0) {
        this.postService.createCategory(categoryData);
      } else {
        console.log('here in the else...');
        this.postService.getCategory(this.category);
        const categoryData = {
          posts: 2,
        };
        this.postService.getCategory(data.category).update(categoryData);
        // this.afs.collection('categories').doc(id).update({posts: postsNum + 1});
      }
    });

    this.postService.create(data);

    //this.afs.collection('categories').doc(id).update({posts: postsNum + 1});

    setTimeout(() => (this.buttonText = 'Create Post'), 3000);
    this.title = '';
    this.content = '';
    this.image = '';
    this.category = '';
    this.buttonText = 'Post Created';

    this.router.navigate(['/blog']);
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    const path = `posts/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('only image files');
    } else {
      const task = this.storage.upload(path, file);
      const ref = this.storage.ref(path);
      this.uploadPercent = task.percentageChanges();
      console.log('Image uploaded!');
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = ref.getDownloadURL();
            this.downloadURL.subscribe((url) => (this.image = url));
          })
        )
        .subscribe();
    }
  }

  parseHtml(string: any): any {
    return string.replace(/<(?:.|\n)*?>/gm, ' ');
  }

  getCategory(id: string) {
    const result = this.postService
      .getCategoryData(id)
      .subscribe((data) => (this.cat = data));
    return result;
  }

  getCategoryByName(name: string) {
    return this.afs
      .collection('categories', (ref) => ref.where('name', '==', name))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Category;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  updateDoc(name: string) {
    let doc = this.afs.collection('categories', (ref) =>
      ref.where('name', '==', name)
    );
    doc.snapshotChanges().subscribe((res: any) => {
      let id = res[0].payload.doc.id;
      let data = res[0].payload.doc.data() as Category;
      this.afs.doc(`categories/${id}`).update({ posts: data.posts + 1 });
    });
  }
}
