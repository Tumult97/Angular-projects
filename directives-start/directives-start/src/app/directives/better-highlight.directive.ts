import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2, RendererType2} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() default = 'transparent';
  @Input('appBetterHighlight') highlight = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor = this.default;

  @HostListener('mouseenter') mouseover(eventData: Event) {
    /*this.renderer.setStyle(
      this.elRef.nativeElement,
      'background-color',
      'red');*/
    this.backgroundColor = this.highlight;
  }
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    /*this.renderer.setStyle(
      this.elRef.nativeElement,
      'background-color',
      'transparent');*/
    this.backgroundColor = this.default;
  }

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.backgroundColor = this.default;
  }

}
