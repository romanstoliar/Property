import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: 'ng-template[item]'
})
export class ItemDirective {
	constructor(public template: TemplateRef<any>) {}
}
