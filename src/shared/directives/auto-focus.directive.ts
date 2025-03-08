import { Directive, AfterViewInit, inject, ElementRef } from '@angular/core';
import { SweetmixInputComponent } from '@shared/components';

@Directive({ selector: '[swAutoFocus]' })
export class AutoFocusDirective implements AfterViewInit {
  private elementRef = inject(ElementRef);
  private sweetmixInputRef = inject(SweetmixInputComponent, { optional: true, host: true });

  ngAfterViewInit() {
    if (this.sweetmixInputRef) {
      this.sweetmixInputRef.focus();
    } else {
      this.elementRef.nativeElement.focus();
    }
  }
}
