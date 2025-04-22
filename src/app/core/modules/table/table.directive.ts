import { Directive, TemplateRef, Input } from '@angular/core';

/**
 * CellDirective
 *
 * This directive is used to define a custom template for a specific cell in the table.
 * The `cell` input property is used to identify which column the template corresponds to.
 */
@Directive({
    selector: 'ng-template[cell]',
    standalone: false
})
export class CellDirective {
	@Input() cell: any;

	constructor(public template: TemplateRef<any>) {}
}

/**
 * SortDirective
 *
 * The `SortDirective` is used to enable sorting for a particular column in the table.
 * The `cell` input property corresponds to the column that should be sortable.
 */
@Directive({
    selector: 'ng-template[sort]',
    standalone: false
})
export class SortDirective {
	@Input() cell: any;

	constructor(public template: TemplateRef<any>) {}
}

/**
 * ActionsDirective
 *
 * The `ActionsDirective` allows you to define a custom template for the actions column in the table.
 * This can include buttons or links for editing, deleting, or performing other actions on a row.
 */
@Directive({
    selector: 'ng-template[actions]',
    standalone: false
})
export class ActionsDirective {
	constructor(public template: TemplateRef<any>) {}
}

/**
 * CustomEditDirective
 *
 * The `CustomEditDirective` is used to create a custom form for editing or creating entries within the table.
 * This directive enables the flexibility to design your own form layout and functionality.
 */
@Directive({
    selector: 'ng-template[customEdit]',
    standalone: false
})
export class CustomEditDirective {
	constructor(public template: TemplateRef<any>) {}
}
