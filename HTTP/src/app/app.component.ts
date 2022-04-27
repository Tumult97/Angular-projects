import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  httpPostsPostSub: Subscription;
  httpPostsGetSub: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.httpPostsPostSub = this.http.post(
      'https://ng-test-build-default-rtdb.europe-west1.firebasedatabase.app/posts.json', 
      postData
    ).subscribe(resp => {
      console.log(resp);
    });
    console.log(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts(){
    this.httpPostsGetSub = this.http.get('https://ng-test-build-default-rtdb.europe-west1.firebasedatabase.app/posts.json').subscribe(resp => {
      console.log(resp);
    });
  }

  ngOnDestroy(): void {
    
  }
}
