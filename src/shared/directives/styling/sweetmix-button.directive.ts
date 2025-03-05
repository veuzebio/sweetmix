import { Directive, HostBinding } from '@angular/core';

const BUTTON_CLASS = [
  'text-white',
  'bg-blue-700',
  'hover:bg-blue-800',
  'focus:ring-4',
  'focus:ring-blue-300',
  'font-medium',
  'rounded-lg',
  'text-sm',
  'sm:w-auto',
  'px-3',
  'py-2',
  'text-center',
];

@Directive({ selector: 'button[swButton]' })
export class SweetmixButtonDirective {
  @HostBinding('class') 
  get classes(): string[] {
    return BUTTON_CLASS;
  }
}
