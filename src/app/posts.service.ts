import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { IPost } from './interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Array<IPost> = [];
  private postsUpdated = new Subject<IPost[]>();
  constructor() { }

  getPosts() {
    return [...this.posts];
  };

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: IPost = { title, content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
