import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from './../../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IPost } from 'src/app/interfaces/post.interface';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle: string = '';
  enteredContent: string = '';
  private mode = 'create';
  private postId: string;
  post: IPost;
  constructor(public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          }
        });
      }
      else {
        this.mode = 'create';
        this.postId = null;
      }
    })
  }

  onSavePost(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(this.postId, form.value.title, form.value.content)
    }
    form.resetForm();
  };
}
