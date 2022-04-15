import {Directive, ElementRef, OnInit} from '@angular/core';
import {Element} from '@angular/compiler';

@Directive({
  selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {

  constructor(private elementRef: ElementRef, ) { }

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}
