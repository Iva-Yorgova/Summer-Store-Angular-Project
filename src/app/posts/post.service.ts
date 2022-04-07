import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
//import 'rxjs/add/operator/map';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Post } from './post';
import { Observable } from 'rxjs';
import { Category } from './category';

@Injectable()
export class PostService {

  postsCollection: AngularFirestoreCollection<Post>;
  categoriesCollection: AngularFirestoreCollection<Category>;
  postDoc!: AngularFirestoreDocument<Post>;
  categoryDoc!: AngularFirestoreDocument<Category>;

  constructor(private afs: AngularFirestore) { 
    this.postsCollection = this.afs.collection('posts', ref => 
    ref.orderBy('published', 'desc'));

    this.categoriesCollection = this.afs.collection('categories', ref => 
    ref.orderBy('name', 'asc'));
  }

  getPosts() {
    return this.postsCollection.snapshotChanges().pipe(map((actions) => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    }))
  }

  getCategories() {
    return this.categoriesCollection.snapshotChanges().pipe(map((actions) => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Category;
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

  getPostsByCategory(name: string) {
    const posts = this.afs.collection<Post>('posts', 
    ref => ref.where('category', '==', name));
    return posts;
  }

  create(data: Post) {
    this.postsCollection.add(data);
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
