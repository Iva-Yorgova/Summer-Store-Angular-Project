import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { AuthService } from 'src/app/blog/auth.service';
import { PostService } from '../post.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Post } from '../post';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Category } from '../category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {

  posts: Observable<Post[]> | any;
  cat: Observable<Category> | any;
  itemDoc!: AngularFirestoreDocument<Category>;
  categories: Observable<Category[]> | any;
  form: FormGroup;

  constructor(
    private auth: AuthService, 
    private postService: PostService,
    private storage: AngularFireStorage,
    private router: Router,
    private afs: AngularFirestore,
    private formBuilder: FormBuilder) 
    { 
      this.categories = this.afs.collection('categories').snapshotChanges();

      this.form = this.formBuilder.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        content: ['', [Validators.required, Validators.minLength(20)]],
        category: ['', [Validators.required, Validators.minLength(3)]]
      });
  }

  title: string | any;
  image: string | any;
  content: string | any;
  likes: number = 0;
  category: string | any;
  comments: string[] | any;

  buttonText: string = 'Create Post';

  uploadPercent: Observable<number> | any;
  downloadURL: Observable<string> | undefined;

  ngOnInit(): void {
  }

  createPost() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      content: this.content,
      image: this.image,
      published: new Date(),
      title: this.title,
      likes: this.likes,
      category: this.category,
      comments: 0
    }
    const categoryData = {
      name: this.category,
      posts: 1
    }
    this.postService.create(data);
    
    // if(this.getCategory(this.category)){
    //    console.log('found match');
    //    const formData = {
    //     posts: this.cat.posts + 1
    //   }
    //   this.postService.updateCat(this.category, formData);
    // }
    // else {
    //   this.postService.createCategory(categoryData);
    // }

    this.postService.createCategory(categoryData);
    console.log('created');
    setTimeout(() => this.buttonText = 'Create Post', 3000);
    this.title = '';
    this.content = '';
    this.image = '';
    this.category = '';
    this.buttonText = 'Post Created'
    
    this.router.navigate(["/blog"]);
  }

  uploadImage(event: any) {
    const file = event.target.files[0]
    const path = `posts/${file.name}`
    if (file.type.split('/')[0] !== 'image') {
      return alert('only image files')
    } else {
      const task = this.storage.upload(path, file);
      const ref = this.storage.ref(path);
      this.uploadPercent = task.percentageChanges();
      console.log('Image uploaded!');
      task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = ref.getDownloadURL()
        this.downloadURL.subscribe(url => (this.image = url));
      }))
      .subscribe();
    }
  }

  parseHtml(string: any): any {
    return string.replace(/<(?:.|\n)*?>/gm, ' ');
  }

  getCategory(name: string) {
    const result =  this.postService.getCategoryData(name)
    .subscribe(data => this.cat = data);
    return result;
  }


  

}
