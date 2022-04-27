import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpPostPostSub: Subscription;
  httpPostDeleteSub: Subscription;

  constructor(private http: HttpClient) { }

  Add(title: String, content: string){
    this.httpPostPostSub = this.http.post<{name: string, }>(
			'https://ng-test-build-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
			{title: title, content: content}
		).subscribe(resp => {
      this.httpPostPostSub.unsubscribe();
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
