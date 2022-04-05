import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/blog/auth.service';
import { PostService } from '../post.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {

  constructor(
    private auth: AuthService, 
    private postService: PostService,
    private storage: AngularFireStorage) 
    { }

  title: string | any;
  image: string | any;
  content: string | any;

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
      title: this.title
    }
    this.postService.create(data);
    this.title = '';
    this.content = '';
    this.image = '';
    this.buttonText = 'Post Created'
    setTimeout(() => this.buttonText = 'Create Post', 3000);
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

  

}
