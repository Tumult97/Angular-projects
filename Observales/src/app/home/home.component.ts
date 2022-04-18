import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subs: Subscription;

  constructor() { }

  ngOnInit() {
    // this.subs = interval(1000).subscribe(
    //   count => {
    //     console.log(count);

    //   }
    // );

    const customIntervalObservable = new Observable(
      observer => {
        let count = 0;
        setInterval(
          () => {
            observer.next(count);
            if(count == 2){
              observer.complete();
            }
            if(count > 5){
              observer.error(new Error('Count is too big'));
            }
            count++;
          },
          1000
        );
      }
    );

    

    this.subs = customIntervalObservable.pipe(
      filter(
        (data: number) => {
          return data > 0;
        }
      ),
      map(
        (data: number) => {
          return 'Round ' + (data + 1);
        }
      )
    ).subscribe(
      count => {
        console.log(count);
      },
      error => {
        alert(error.message);
      },
      () => {
        console.log('benis');
      }
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
