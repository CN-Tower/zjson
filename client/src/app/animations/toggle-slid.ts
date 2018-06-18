import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const toggleSlid = trigger('toggleSlid', [
  state('void', style({right: '-100%', display: 'none'})),
  state('show', style({right: 0, display: 'block'})),
  state('hide', style({right: '-100%', display: 'none'})),
  transition('* => show', [
    animate('0.5s ease')
  ]),
  transition('* => hide', [
    animate('0.5s ease')
  ])
]);
