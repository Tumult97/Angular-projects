import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  errorSubject = new Subject<string>();

  constructor(private http: HttpClient) { }

  Add(title: String, content: string){
    this.http.post<{name: string, }>(
			'https://ng-test-build-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
			{title: title, content: content}
		).subscribe(resp => {
      
    },
    error => {
      this.errorSubject.next(error.message);
    });
  }

  fetch() {
    return this.http
			.get<{[key: string]: Post}>('https://ng-test-build-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
			.pipe(map((resp) => {
				const posts: Post[] = [];
				for(const key in resp){
					if(resp.hasOwnProperty(key))
						posts.push({...resp[key], id: key});
				}
				return posts;
			}));
  }

  delete(){
    // this.httpPostDeleteSub = this.http
    //   .delete('https://ng-test-build-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
    //   .subscribe(resp => {
    //     this.httpPostDeleteSub.unsubscribe();
    //   });

    return this.http
      .delete('https://ng-test-build-default-rtdb.europe-west1.firebasedatabase.app/posts.json');
  }

  deleteById(id: string){
    // this.httpPostDeleteSub = this.http
    //   .delete(`https://ng-test-build-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`)
    //   .subscribe(resp => {
    //     this.httpPostDeleteSub.unsubscribe();
    //   });

    return this.http
      .delete(`https://ng-test-build-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`);
  }
}
