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
			key: 'smesi',
			label: 'Суміші та розчини',
			link: 'https://epicentrk.ua/ua/shop/smesi.html',
			image: 'assets/smesi.jpg'
		},
		{
			key: 'laki-i-kraski',
			label: 'Фарби та лаки',
			link: 'https://epicentrk.ua/ua/shop/laki-i-kraski.html',
			image: 'assets/laki.jpg'
		},
		{
			key: 'santehnika',
			label: 'Сантехніка',
			link: 'https://epicentrk.ua/ua/shop/santehnika.html',
			image: 'assets/santehnika.jpg'
		},
		{
			key: 'elektro',
			label: 'Електрика',
			link: 'https://epicentrk.ua/ua/shop/elektrotovary.html',
			image: 'assets/elektro.jpg'
		},
		{
			key: 'budmaterialy',
			label: 'Будматеріали',
			link: 'https://epicentrk.ua/ua/shop/budivelnye-materialy/',
			image: 'assets/budmaterialy.jpg'
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
