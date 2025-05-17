import { Component } from '@angular/core';

@Component({
	templateUrl: './materials.component.html',
	styleUrls: ['./materials.component.scss'],
	standalone: false
})
export class MaterialsComponent {
	isMenuOpen = false;

	// Категорії матеріалів з посиланнями на Епіцентр
	materialCategories = [
		{
			label: 'Побутова техніка',
			link: 'https://epicentrk.ua/ua/shop/bytovaya-tekhnika/'
		},
		{
			label: 'Інструменти та обладнання',
			link: 'https://epicentrk.ua/ua/shop/instrumenty-i-oborudovanie/'
		},
		{
			label: 'Сантехніка',
			link: 'https://epicentrk.ua/ua/shop/santekhnika/'
		},
		{
			label: 'Електрика',
			link: 'https://epicentrk.ua/ua/shop/elektrotovary.html'
		},
		{
			label: 'Будматеріали',
			link: 'https://epicentrk.ua/ua/shop/stroitelnye-materialy/'
		}
	];
	selectedCategory: any = null;
}
