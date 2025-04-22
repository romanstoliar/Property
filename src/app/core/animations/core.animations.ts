import {
	trigger,
	state,
	style,
	animate,
	transition
} from '@angular/animations';

export const coreAnimation = [
	trigger('flyInOut', [
		state('in', style({ transform: 'translateX(0)' })),
		transition('void => *', [
			style({
				transform: 'translateY(-10px)',
				opacity: 0,
				height: '0'
			}),
			animate(400)
		]),
		transition('* => void', [
			animate(
				400,
				style({
					opacity: 0,
					height: '0',
					transform: 'translateY(-10px)'
				})
			)
		])
	]),
	trigger('tabInOut', [
		state('in', style({ transform: 'translateX(0)' })),
		transition('void => *', [
			style({
				transform: 'translateX(10px)',
				opacity: 0
			}),
			animate(300)
		]),
		transition('* => void', [
			animate(
				300,
				style({
					opacity: 0,
					// height: '50px'
					transform: 'translateX(10px)'
				})
			)
		])
	]),
	trigger('showInOut', [
		state('in', style({})),
		transition('void => *', [
			style({
				opacity: 0
			}),
			animate(300)
		]),
		transition('* => void', [
			animate(
				300,
				style({
					opacity: 0
				})
			)
		])
	])
];

// Readme
//  === html directive  ===
// (click)="variable"
// *ngIf="!variable"
// [@flyInOut]="variable"

// === import to component  ===
// import { flyAnimation } from "./animation"
// @Component({
// 	animations: [ flyAnimation ]
// })
