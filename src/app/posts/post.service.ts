import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
//import 'rxjs/add/operator/map';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Post } from './post';
import { Observable } from 'rxjs';

@Injectable()
export class PostService {

  postsCollection: AngularFirestoreCollection<Post>;
  postDoc!: AngularFirestoreDocument<Post>;

  constructor(private afs: AngularFirestore) { 
    this.postsCollection = this.afs.collection('posts', ref => 
    ref.orderBy('published', 'desc'));
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

  getPostData(id: any) {
    this.postDoc = this.afs.doc<Post>(`posts/${id}`);
    return this.postDoc.valueChanges();
  }

  create(data: Post) {
    this.postsCollection.add(data);
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
