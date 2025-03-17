import { NgClass } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';

const PANEL_BASE_CLASS = ['my-5', 'rounded-md', 'outline-1'];

const PANEL_GRAY_CLASS = ['p-4','outline-gray-300'];

const PANEL_RED_CLASS = ['outline-red-800'];

const PANEL_GREEN_CLASS = ['outline-green-800'];

const TITLE_BASE_CLASS = ['text-xl'];

const TITLE_GREEN_CLASS = [
  'text-lg',
  'text-green-800',
  'rounded-t-md',
  'bg-green-100',
  'p-4',
];

const TITLE_RED_CLASS = [
  'text-lg',
  'text-red-800',
  'rounded-t-md',
  'bg-red-100',
  'p-4',
];

type PanelColors = 'gray' | 'red' | 'green';

const PREDEFINED_CLASSES = {
  gray: { panel: PANEL_GRAY_CLASS, title: TITLE_BASE_CLASS },
  red: { panel: PANEL_RED_CLASS, title: TITLE_RED_CLASS },
  green: { panel: PANEL_GREEN_CLASS, title: TITLE_GREEN_CLASS },
};

@Component({
  imports: [NgClass],
  selector: 'sw-panel',
  template: `
    <div [ngClass]="panelClasses">
      <div [ngClass]="titleClasses">{{ title() }}</div>
      <div class="py-4">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class SweetmixPanelComponent implements OnInit {
  title = input.required<string>();
  color = input<PanelColors>('gray');

  get panelClasses(): string[] {
    return [...PANEL_BASE_CLASS, ...PREDEFINED_CLASSES[this.color()].panel];
  }

  get titleClasses(): string[] {
    return [...TITLE_BASE_CLASS, ...PREDEFINED_CLASSES[this.color()].title];
  }

  ngOnInit() {}
}
