import { booleanAttribute, Directive, HostBinding, input } from '@angular/core';

const LABEL_CLASS = [
  'absolute',
  'text-sm',
  'text-gray-500',
  'duration-300',
  'transform',
  '-translate-y-6',
  'scale-75',
  'top-3',
  '-z-10',
  'origin-[0]',
  'peer-focus:left-0',
  'peer-focus:text-blue-600',
  'peer-placeholder-shown:scale-100',
  'peer-placeholder-shown:translate-y-0',
  'peer-focus:scale-75',
  'peer-focus:-translate-y-6',
];

const LABEL_CLASS_ERROR = [
  ...LABEL_CLASS,
  'text-red-500',
  'peer-focus:text-red-600',
];

@Directive({ selector: 'label[swLabel]' })
export class SweetmixLabelDirective {
  hasError = input(false, { transform: booleanAttribute });

  @HostBinding('class')
  get classes(): string[] {
    return this.hasError() ? LABEL_CLASS_ERROR : LABEL_CLASS;
  }
}
