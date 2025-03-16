import { DOCUMENT, ViewportScroller } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, OnInit, inject, input } from '@angular/core';

@Directive({ selector: '[swNavigateOnInit]' })
export class SweetmixNavigateOnInitDirective implements AfterViewInit {
  private elementRef = inject(ElementRef);

  ngAfterViewInit(): void {
    const nativeElement = this.elementRef.nativeElement as HTMLElement;
    
    nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }
}
