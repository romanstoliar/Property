import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface MaterialCategory {
	key: string;
	label: string;
	link: string;
}

@Component({
	templateUrl: './material.component.html',
	styleUrls: ['./material.component.scss'],
	standalone: false
})
export class MaterialComponent implements OnInit {
	category: MaterialCategory | undefined;

	// Тут ті ж ключі, але з посиланнями
	categories: MaterialCategory[] = [
		{
			key: 'smesi',
			label: 'Суміші та розчини',
			link: 'https://epicentrk.ua/ua/shop/smesi.html'
		},
		{
			key: 'laki-i-kraski',
			label: 'Фарби та лаки',
			link: 'https://epicentrk.ua/ua/shop/laki-i-kraski.html'
		},
		{
			key: 'santehnika',
			label: 'Сантехніка',
			link: 'https://epicentrk.ua/ua/shop/santehnika.html'
		},
		{
			key: 'elektro',
			label: 'Електрика',
			link: 'https://epicentrk.ua/ua/shop/elektrotovary.html'
		},
		{
			key: 'budmaterialy',
			label: 'Будматеріали',
			link: 'https://epicentrk.ua/ua/shop/budivelnye-materialy/'
		}
	];

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		const key = this.route.snapshot.paramMap.get('category');
		this.category = this.categories.find((c) => c.key === key);
	}
}
