import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/blog/auth.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { Post } from '../post';
import { PostService } from '../post.service';
import { Comment } from '../comment';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase/app';
import { finalize, map } from 'rxjs/operators';

const arrayRemove = firebase.firestore.FieldValue.arrayRemove;
const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  comments: Observable<Comment[]> | any;
  commentsWithId: Observable<Comment[]> | any;

  post: Post | any;
  editing: boolean = false;
  title: string | any;
  image: string | any;
  content: string | any;
  likes: number = 0;
  category: string | any;
  comment: string | any;

  postComment: Comment | any;
  text: string | any;
  commentLikes: number | any;
  userCanLike: boolean = true;

  uploadPercent: Observable<number> | any;
  downloadURL: Observable<string> | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    public auth: AuthService,
    private dialogService: DialogService,
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.getPost();
    this.comments = this.getPostComments();
    this.commentsWithId = this.getCommentsList();
    this.getUserData();
    this.checkUserLikes();
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    const result = this.postService
      .getPostData(id)
      .subscribe((data) => (this.post = data));
    return result;
  }

  getPostComments() {
    const id = this.route.snapshot.paramMap.get('id');
    const result = this.postService
      .getCommentsByPostId(id)
      .subscribe((data) => (this.comments = data));
    return result;
  }

  getCommentsList() {
    const id = this.route.snapshot.paramMap.get('id');
    const result = this.afs
      .collection<Comment>('comments', (ref) =>
        ref.where('postId', '==', id).orderBy('published', 'desc')
      )
      .valueChanges({ idField: 'id' })
      .subscribe((data) => (this.commentsWithId = data));
    return result;
  }

  getUserData() {
    const user = this.auth.currentUserId;
    return user;
  }

  updatePost() {
    const formData = {
      title: this.post.title,
      content: this.post.content,
      category: this.post.category,
      image: this.post.image,
    };
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.update(id!, formData);
    this.editing = false;
  }

  checkUserLikes() {
    const postId = this.route.snapshot.paramMap.get('id');
    const userId = this.auth.currentUserId;
    this.afs
      .doc(`/posts/${postId}`)
      .get()
      .subscribe((snap) => {
        const data = snap.data() as Post;

        if (data.usersLikes.includes(userId)) {
          console.log('You can not like two times');
          this.userCanLike = false;
          console.log(this.userCanLike);
        }
      });
  }

  likePost() {
    const postId = this.route.snapshot.paramMap.get('id');
    const userId = this.auth.currentUserId;
    console.log(postId);
    console.log(userId);

    this.afs
      .doc(`/posts/${postId}`)
      .get()
      .subscribe((snap) => {
        console.log(snap.id);
        console.log(' this is the data:', snap.data());
        const data = snap.data() as Post;

        if (data.usersLikes.includes(userId)) {
          console.log('you can not like two times');

          const formData = {
            likes: this.post.likes - 1,
          };
          const doc = this.afs.doc(`/posts/${postId}`);

          doc.update({
            usersLikes: arrayRemove(userId),
          });
          this.postService.update(postId!, formData);
          this.userCanLike = true;
        } else {
          console.log('in the else...');
          const formData = {
            likes: this.post.likes + 1,
          };
          const likeData = {
            userId: userId,
          };

          const doc = this.afs.doc(`/posts/${postId}`);

          doc.update({
            usersLikes: arrayUnion(userId),
          });
          this.userCanLike = false;
          this.postService.update(postId!, formData);
          this.editing = false;
          this.checkUserLikes();
        }
      });

    this.afs
      .collection('posts')
      .valueChanges()
      .subscribe((val) => {
        console.log('this is val:', val);
      });
  }

  addComment() {
    const id = this.route.snapshot.paramMap.get('id');
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      postId: id,
      text: this.text,
      published: new Date(),
      likes: 1,
    };
    this.postService.createComment(data);
    const formData = {
      comments: this.post.comments + 1,
    };
    this.postService.update(id!, formData);
    this.text = '';
  }

  deletePost() {
    const id = this.route.snapshot.paramMap.get('id');
    this.dialogService
      .openConfirmDialog('Are you sure you want to delete this post?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.postService.delete(id);
          this.router.navigate(['/blog']);
        }
      });
  }

  deleteComment(commentText: string, commentAuthor: string, commentId: string) {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(commentText, commentAuthor, commentId);
    console.log(id);
    this.dialogService
      .openConfirmDialog('Are you sure you want to delete this comment?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.postService.deleteComment(commentId);
          this.router.navigate([`/blog/${id}`]);
        }
      });
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
}
