import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { ApiService } from './api.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
	loadedPosts: Post[] = [];
	errorSub: Subscription;
	isLoading: boolean = false;
	error: string = null;

	constructor(private http: HttpClient, private apiService: ApiService) { }

	ngOnInit() {
		this.errorSub = this.apiService.errorSubject.subscribe(
			error => {
				this.error = error;
			}
		);
		this.isLoading = true;
		this.apiService.fetch().subscribe(
			resp => {
				this.loadedPosts = resp;
				this.isLoading = false;
			},
			error => {
				this.isLoading = false;
				this.error = error.message;
				console.log(error);
			}
		);
	}

	onCreatePost(postData: Post) {
		// Send Http request
		this.apiService.Add(postData.title, postData.content);
	}

	onFetchPosts() {
		// Send Http request
		this.isLoading = true;
		this.apiService.fetch().subscribe(
			resp => {
				this.loadedPosts = resp;
				this.isLoading = false;
				this.error = null;
			},
			error => {
				this.isLoading = false;
				this.error = error.message;
			}
		);
	}

	onClearPosts() {
		// Send Http request
		this.apiService.delete().subscribe(
			() => {
				this.loadedPosts = [];
			}
		);
	}

	onDeletePost(id: string){
		this.apiService.deleteById(id).subscribe();;
	}

	ngOnDestroy(): void {
		this.errorSub.unsubscribe();
	}
}
