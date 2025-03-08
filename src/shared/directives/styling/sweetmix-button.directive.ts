import { Directive, HostBinding, Input } from '@angular/core';

const BUTTON_BASE_CLASS = [
  'text-white',
  'bg-blue-700',
  'hover:bg-blue-800',
  'focus:ring-4',
  'focus:ring-blue-300',
  'font-medium',
  'rounded-lg',
  'text-sm',
  'p-3',
  'w-fit',	
  'h-fit',	
  'text-center',
];

const BUTTON_BLUE_CLASS = [
  'bg-blue-700',
  'hover:bg-blue-800',
  'focus:ring-blue-300',
];

const BUTTON_RED_CLASS = [
  'bg-red-400',
  'hover:bg-red-600',
  'focus:ring-red-300',
];

const BUTTON_GREEN_CLASS = [
  'bg-green-700',
  'hover:bg-green-800',
  'focus:ring-green-300',
];

const PREDEFINED_CLASSES = {
  blue: BUTTON_BLUE_CLASS,
  red: BUTTON_RED_CLASS,
  green: BUTTON_GREEN_CLASS
}

@Directive({ selector: 'button[swButton]' })
export class SweetmixButtonDirective {
  @Input()
  color: 'blue' | 'red' | 'green' = 'blue';

  @HostBinding('class') 
  get classes(): string[] {
    return [
      ...BUTTON_BASE_CLASS,
      ...PREDEFINED_CLASSES[this.color],
    ];
  }
}
