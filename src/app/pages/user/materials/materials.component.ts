import { Component } from '@angular/core';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
interface MaterialCategory {
	key: string;
	label: string;
	link: string;
	image?: string;
}

@Component({
	templateUrl: './materials.component.html',
	styleUrls: ['./materials.component.scss'],
	standalone: false
})
export class MaterialsComponent {
	isMenuOpen = false;
	searchTerm = '';

	materialCategories: MaterialCategory[] = [
		{
			key: 'budrem',
			label: 'Construction and repair',
			link: 'https://epicentrk.ua/ua/shop/stroitelstvo-i-remont/',
			image: 'assets/materials/budivnytstvo.jpg'
		},
		{
			key: 'porkyttia',
			label: 'Floor coverings',
			link: 'https://epicentrk.ua/ua/shop/poly/',
			image: 'assets/materials/pidloga.png'
		},
		{
			key: 'santechnika',
			label: 'Plumbing',
			link: 'https://epicentrk.ua/ua/shop/santekhnika/',
			image: 'assets/materials/santechnika.jpg'
		},
		{
			key: 'mebli',
			label: 'Furniture',
			link: 'https://epicentrk.ua/ua/shop/mebel/',
			image: 'assets/materials/mebli.png'
		},
		{
			key: 'dacha',
			label: 'Cottage and garden',
			link: 'https://epicentrk.ua/ua/shop/dacha-sad-i-ogorod/',
			image: 'assets/materials/dacha.png'
		},
		{
			key: 'diminter',
			label: 'Home and interior',
			link: 'https://epicentrk.ua/ua/shop/dom-i-interer/',
			image: 'assets/materials/diminterer.png'
		},
		{
			key: 'instruments',
			label: 'Tools and equipment',
			link: 'https://epicentrk.ua/ua/shop/instrumenty-i-oborudovanie/',
			image: 'assets/materials/tools.png'
		},
		{
			key: 'pobuttech',
			label: 'Home appliances',
			link: 'https://epicentrk.ua/ua/shop/bytovaya-tekhnika/',
			image: 'assets/materials/technika.png'
		},
		{
			key: 'sitka',
			label: 'Lighting',
			link: 'https://epicentrk.ua/ua/shop/osveshcheniye/',
			image: 'assets/materials/svitlo.png'
		},
		{
			key: 'secsys',
			label: 'Security and surveillance',
			link: 'https://epicentrk.ua/ua/shop/sistemy-bezopasnosti-i-videonablyudeniya/',
			image: 'assets/materials/videocamera.jpg'
		},
		{
			key: 'khimia',
			label: 'Household chemicals',
			link: 'https://epicentrk.ua/ua/shop/bytovaya-khimiya/',
			image: 'assets/materials/pobutkhimia.png'
		}
	];

	constructor(private _translate: TranslateService) {}
	get filteredCategories(): MaterialCategory[] {
		const term = this.searchTerm.toLowerCase().trim();
		if (!term) return this.materialCategories;
		return this.materialCategories.filter((cat) =>
			cat.label.toLowerCase().includes(term)
		);
	}
	getTranslatedText(toTranslate: string) {
		return this._translate.translate(toTranslate);
	}
	getTranslatedLabel(label: string): string {
		return this._translate.translate(`Common.${label}`);
	}
	getTranslated(text: string): string {
		return this._translate.translate('Common.' + text);
	}

	getTranslatedWithNamespace(key: string, ns: string = 'Common'): string {
		return this._translate.translate(`${ns}.${key}`);
	}
}
