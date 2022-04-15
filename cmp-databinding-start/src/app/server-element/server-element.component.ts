import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import { Server } from '../../models/server.model';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck {
  @Input() element: Server;
  @Input() name: string;

  constructor() {
    console.log('constructor');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
    console.log(changes);
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  ngDoCheck() {
    console.log('ngDoCheck');
  }

}
