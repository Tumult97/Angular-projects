import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
	loadedPosts: Post[] = [];
	httpPostsPostSub: Subscription;
	httpPostsGetSub: Subscription;
	isLoading: boolean = false;

	constructor(private http: HttpClient) { }

	ngOnInit() {
		this.fetchPosts();
	}

	onCreatePost(postData: Post) {
		// Send Http request
		this.httpPostsPostSub = this.http.post<{name: string, }>(
			'https://ng-test-build-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
			postData
		).subscribe(resp => {
			//this.fetchPosts();
		});
	}

	onFetchPosts() {
		// Send Http request
		this.fetchPosts();
	}

	onClearPosts() {
		// Send Http request
	}

	private fetchPosts() {
		this.isLoading = true;
		this.httpPostsGetSub = this.http
			.get<{[key: string]: Post}>('https://ng-test-build-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
			.pipe(map((resp) => {
				const posts: Post[] = [];
				for(const key in resp){
					if(resp.hasOwnProperty(key))
						posts.push({...resp[key], id: key});
				}
				return posts;
			}))
			.subscribe(resp => {
				this.isLoading = false;
				this.loadedPosts = resp;
			});
	}

	ngOnDestroy(): void {
		this.httpPostsGetSub.unsubscribe();
		this.httpPostsPostSub.unsubscribe();
	}
}
