import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
//import 'rxjs/add/operator/map';

import { Observable } from 'rxjs';
import { Category } from './category';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Post } from './post';
import { Comment } from './comment';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../blog/auth.service';

@Injectable()
export class PostService {

  postsCollection: AngularFirestoreCollection<Post>;
  userPostsCollection: AngularFirestoreCollection<Post>;
  categoriesCollection: AngularFirestoreCollection<Category>;
  commentsCollection: AngularFirestoreCollection<Comment>;
  postDoc!: AngularFirestoreDocument<Post>;
  categoryDoc!: AngularFirestoreDocument<Category>;

  filteredPosts: any;
  
  constructor(private afs: AngularFirestore, private route: ActivatedRoute,public auth: AuthService) { 
    this.postsCollection = this.afs.collection('posts', ref => 
    ref.orderBy('published', 'desc'));

    this.userPostsCollection = this.afs.collection('posts', ref => 
    ref.orderBy('published', 'desc'));

    this.categoriesCollection = this.afs.collection('categories', ref => 
    ref.orderBy('name', 'asc'));

    this.commentsCollection = this.afs.collection('comments', ref => 
    ref.orderBy('published', 'desc'));
  }

  getPosts() {
    return this.postsCollection.snapshotChanges().pipe(delay(1000), map((actions) => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    }))
  }

  getUserPosts() {
    return this.userPostsCollection.snapshotChanges().pipe(delay(1000), map((actions) => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    }))
  }

  getMyPosts() {
    const userId = this.auth.currentUserId;
    return this.afs.collection('posts', ref => ref.where('authorId','==', userId)).valueChanges();
};


  getCategories() {
    return this.categoriesCollection.snapshotChanges().pipe(map((actions) => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Category;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    }))
  }

  getComments() {
    return this.commentsCollection.snapshotChanges().pipe(map((actions) => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Comment;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    }))
  }

  getPostData(id: any) {
    this.postDoc = this.afs.doc<Post>(`posts/${id}`);
    return this.postDoc.valueChanges();
  }

  getCategoryData(name: string) {
    const category = this.afs.collection<Category>('categories', 
    ref => ref.where('name', '==', name));
    return category;
  }

  getPostsByCategory(name: string): Observable<any> {
    const posts = this.afs.collection<Post>('posts', 
    ref => ref.where('category', '==', name)).valueChanges();
    return posts;
  }

  getCommentsByPostId(id: any): Observable<any> {
    const comments = this.afs.collection<Comment>('comments', 
    ref => ref.where('postId', '==', id)).valueChanges();
    return comments;
  }

  create(data: Post) {
    this.postsCollection.add(data);
  }

  createComment(data: Comment) {
    this.commentsCollection.add(data);
  }

  createCategory(data: Category) {
    this.categoriesCollection.add(data);
  }

  getPost(id: string) {
    return this.afs.doc<Post>(`posts/${id}`);
  }

  delete(id: any) {
    return this.getPost(id).delete();
  }

  update(id: string, formData: Partial<Post>) {
    return this.getPost(id).update(formData);
  }

}
