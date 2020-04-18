import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'
import { IPost } from 'src/app/interfaces/post.interface';
import { PostsService } from './../../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Array<IPost> = [];
  private postsSub: Subscription;
  
  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Array<IPost>) => {
        this.posts = posts;
      });
  };

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  };

}
