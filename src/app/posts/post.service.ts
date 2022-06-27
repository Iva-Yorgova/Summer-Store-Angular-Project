import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
//import 'rxjs/add/operator/map';

import { Observable } from 'rxjs';
import { Category } from './category';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Post } from './post';
import { Comment } from './comment';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../blog/auth.service';
import { Like } from './like';

@Injectable()
export class PostService {
  postsCollection: AngularFirestoreCollection<Post>;
  userPostsCollection: AngularFirestoreCollection<Post>;
  categoriesCollection: AngularFirestoreCollection<Category>;
  likesCollection: AngularFirestoreCollection<Like>;
  commentsCollection: AngularFirestoreCollection<Comment>;
  userComment: AngularFirestoreDocument<Comment>;
  postDoc!: AngularFirestoreDocument<Post>;
  categoryDoc!: AngularFirestoreDocument<Category>;
  categoriesByName: AngularFirestoreCollection<Category>;

  filteredPosts: any;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    public auth: AuthService
  ) {
    this.postsCollection = this.afs.collection('posts', (ref) =>
      ref.orderBy('published', 'desc')
    );

    this.userPostsCollection = this.afs.collection('posts', (ref) =>
      ref.orderBy('published', 'desc')
    );

    this.categoriesCollection = this.afs.collection('categories', (ref) =>
      ref.orderBy('name', 'asc')
    );

    this.commentsCollection = this.afs.collection('comments', (ref) =>
      ref.orderBy('published', 'desc')
    );

    this.likesCollection = this.afs.collection('likes', (ref) =>
      ref.orderBy('published', 'desc')
    );
  }

  getPosts() {
    return this.postsCollection.snapshotChanges().pipe(
      delay(1000),
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getMyPosts() {
    const userId = this.auth.currentUserId;
    return this.afs
      .collection('posts', (ref) => ref.where('authorId', '==', userId))
      .snapshotChanges()
      .pipe(
        delay(1000),
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Post;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  getCategoriesByName(name: string) {
    const array = this.afs
      .collection<Category>('categories', (ref) =>
        ref.where('name', '==', name)
      )
      .valueChanges();
    return array;
  }

  getLikesByPostAndUser(userId: any, postId: any): Observable<Post[]> {
    return this.afs
      .collection('likes', (ref) =>
        ref.where('userId', '==', userId).where('postId', '==', postId)
      )
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return snaps.map((snap) => {
            const data = snap.payload.doc.data() as Post;
            const id = snap.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  filterCategoriesByName(name: string) {
    return this.afs
      .collection('categories', (ref) => ref.where('name', '==', name))
      .valueChanges();
  }

  getPostsByCategory(name: string) {
    const posts = this.afs
      .collection<Post>('posts', (ref) => ref.where('category', '==', name))
      .valueChanges();
    return posts;
  }

  getCategories() {
    return this.categoriesCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Category;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getComments() {
    return this.commentsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Comment;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getPostData(id: any) {
    this.postDoc = this.afs.doc<Post>(`posts/${id}`);
    return this.postDoc.valueChanges();
  }

  getCategoryData(id: string) {
    this.categoryDoc = this.afs.doc<Category>(`categories/${id}`);
    return this.categoryDoc.valueChanges();
  }

  getCommentsByPostId(id: any): Observable<any> {
    const comments = this.afs
      .collection<Comment>('comments', (ref) =>
        ref.where('postId', '==', id).orderBy('published', 'desc')
      )
      .valueChanges();
    return comments;
  }

  getCommentByAuthorAndText(text: string, author: string) {
    const comment = this.afs
      .collection<Comment>('comments', (ref) =>
        ref.where('text', '==', text).where('author', '==', author)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Comment;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    return comment;
  }

  getLikeByPostAndUser(userId: any, postId: any) {
    return this.afs
      .collection('likes', (ref) =>
        ref.where('postId', '==', postId).where('userId', '==', 'userId')
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Like;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  create(data: Post) {
    this.postsCollection.add(data);
  }

  createComment(data: Comment) {
    this.commentsCollection.add(data);
  }

  deleteComment(id: any) {
    return this.getComment(id).delete();
  }

  createCategory(data: Category) {
    this.categoriesCollection.add(data);
  }

  createLike(data: Like) {
    this.likesCollection.add(data);
  }

  getPost(id: string) {
    return this.afs.doc<Post>(`posts/${id}`);
  }

  getComment(id: string) {
    return this.afs.doc<Comment>(`comments/${id}`);
  }

  getCategory(name: string) {
    return this.afs.doc<Category>(`categories/${name}`);
  }

  delete(id: any) {
    return this.getPost(id).delete();
  }

  update(id: string, formData: Partial<Post>) {
    return this.getPost(id).update(formData);
  }

  updateCat(id: string, formData: Partial<Category>) {
    return this.getCategory(id).update(formData);
  }
}
