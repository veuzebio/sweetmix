import { booleanAttribute, Directive, HostBinding, input } from '@angular/core';

const INPUT_CLASS = [
  'block',
  'py-2.5',
  'px-0',
  'w-full',
  'text-sm',
  'text-gray-900',
  'bg-transparent',
  'border-0',
  'border-b-2',
  'border-gray-300',
  'appearance-none',
  'focus:outline-none',
  'focus:ring-0',
  'focus:border-blue-600',
  'peer',
];

const INPUT_CLASS_ERROR = [
  ...INPUT_CLASS,
  'border-red-300',
  'focus:border-red-600',
];

@Directive({ selector: 'input[swInput]' })
export class SweetmixInputDirective {
  hasError = input(false, { transform: booleanAttribute });

  @HostBinding('class')
  get classes(): string[] {
    return this.hasError() ? INPUT_CLASS_ERROR : INPUT_CLASS;
  }
}
