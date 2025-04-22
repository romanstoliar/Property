import { OnInit, Directive, ElementRef } from '@angular/core';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';

@Directive({
    selector: '[translate]',
    standalone: false
})
export class TranslateDirective implements OnInit {
	constructor(public elementRef: ElementRef, private tr: TranslateService) { }

	/**
	 * On initialization, this directive replaces the innerHTML of the element
	 * with the translated version of the text.
	 */
	ngOnInit() {
		this.elementRef.nativeElement.innerHTML = this.tr.translate(
			this.elementRef.nativeElement.innerHTML,
			(translate: string) => {
				this.elementRef.nativeElement.innerHTML = translate;
			}
		);
	}
}
