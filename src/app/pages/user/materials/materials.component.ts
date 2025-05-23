import { Component } from '@angular/core';

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
			label: 'Будівництво та ремонт',
			link: 'https://epicentrk.ua/ua/shop/stroitelstvo-i-remont/',
			image: 'assets/materials/budivnytstvo.jpg'
		},
		{
			key: 'porkyttia',
			label: 'Покриття для підлоги',
			link: 'https://epicentrk.ua/ua/shop/poly/',
			image: 'assets/materials/pidloga.png'
		},
		{
			key: 'santechnika',
			label: 'Сантехніка',
			link: 'https://epicentrk.ua/ua/shop/santekhnika/',
			image: 'assets/materials/santechnika.jpg'
		},
		{
			key: 'mebli',
			label: 'Меблі',
			link: 'https://epicentrk.ua/ua/shop/mebel/',
			image: 'assets/materials/mebli.png'
		},
		{
			key: 'dacha',
			label: 'Дача, сад та город',
			link: 'https://epicentrk.ua/ua/shop/dacha-sad-i-ogorod/',
			image: 'assets/materials/dacha.png'
		},
		{
			key: 'diminter',
			label: "Дім та інтер'єр",
			link: 'https://epicentrk.ua/ua/shop/dom-i-interer/',
			image: 'assets/materials/diminterer.png'
		},
		{
			key: 'instruments',
			label: 'Інструменти та обладнання',
			link: 'https://epicentrk.ua/ua/shop/instrumenty-i-oborudovanie/',
			image: 'assets/materials/tools.png'
		},
		{
			key: 'pobuttech',
			label: 'Побутова техніка',
			link: 'https://epicentrk.ua/ua/shop/bytovaya-tekhnika/',
			image: 'assets/materials/technika.png'
		},
		{
			key: 'sitka',
			label: 'Освітлення',
			link: 'https://epicentrk.ua/ua/shop/osveshcheniye/',
			image: 'assets/materials/svitlo.png'
		},
		{
			key: 'secsys',
			label: 'Система безпеки та відеоспостереження',
			link: 'https://epicentrk.ua/ua/shop/sistemy-bezopasnosti-i-videonablyudeniya/',
			image: 'assets/materials/videocamera.jpg'
		},
		{
			key: 'secsys',
			label: 'Побутова хімія',
			link: 'https://epicentrk.ua/ua/shop/bytovaya-khimiya/',
			image: 'assets/materials/pobutkhimia.png'
		}
	];

	get filteredCategories(): MaterialCategory[] {
		const term = this.searchTerm.toLowerCase().trim();
		if (!term) return this.materialCategories;
		return this.materialCategories.filter((cat) =>
			cat.label.toLowerCase().includes(term)
		);
	}
}
