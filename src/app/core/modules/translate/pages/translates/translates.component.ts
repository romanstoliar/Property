import { Component } from '@angular/core';
import { Language, TranslateService, Word } from '../../translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { HttpService } from 'wacom';

interface Translate {
	translate: string;
	slug: string;
	lang: string;
}

interface TranslateAll {
	words: string;
	translates: string;
}

@Component({
    templateUrl: './translates.component.html',
    styleUrls: ['./translates.component.scss'],
    standalone: false
})
export class TranslatesComponent {
	columns = ['page', 'word', 'translation'];
	form: FormInterface = this._form.getForm('translate', {
		formId: 'translate',
		title: 'Translate',
		components: [
			{
				name: 'Text',
				key: 'translate',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill Translate'
					},
					{
						name: 'Label',
						value: 'Translate'
					},
					{
						name: 'Textarea',
						value: true
					}
				]
			}
		]
	});
	formAll: FormInterface = this._form.getForm('translateAll', {
		formId: 'translateAll',
		title: 'Translate All',
		components: [
			{
				name: 'Text',
				key: 'words',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill Translate'
					},
					{
						name: 'Label',
						value: 'Translate'
					},
					{
						name: 'Textarea',
						value: true
					}
				]
			},
			{
				name: 'Text',
				key: 'translates',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill Translate'
					},
					{
						name: 'Label',
						value: 'Translate'
					},
					{
						name: 'Textarea',
						value: true
					}
				]
			}
		]
	});
	config = {
		update: (doc: Translate) => {
			this._form
				.modal<Translate>(this.form, [], {
					translate: this.ts.translate(doc.slug)
				})
				.then((updated: Translate) => {
					this._http.post('/api/translate/create', {
						appId: this.ts.appId,
						slug: doc.slug,
						lang: this.ts.language.code,
						translate: updated.translate
					});
					this.ts.translates[this.ts.language.code][doc.slug] =
						updated.translate;
					this.ts.reset();
				});
		}
	};
	pages = [
		{
			name: this.ts.translate('Common.All'),
			_id: ''
		}
	].concat(
		this.ts.pages.map((p: string) => {
			return {
				name: p,
				_id: p
			};
		})
	);
	page = localStorage.getItem('page') || '';
	setPage(page: string) {
		this.page = page;
		localStorage.setItem('page', page);
	}

	get rows(): Word[] {
		return this.ts.words.filter((w) => {
			return this.page && typeof w === 'object'
				? this.page === w.slug.split('.')[0]
				: true;
		});
	}

	constructor(
		public ts: TranslateService,
		private _form: FormService,
		private _http: HttpService
	) {}

	translateAll(missed = false): void {
		const rows = missed
			? this.rows.filter(
				(r) => !this.ts.translates[this.ts.language.code][r.slug]
			)
			: this.rows;
		const words = JSON.stringify(rows.map((r) => r.word));
		const slugs = rows.map((r) => r.slug);
		const translates = JSON.stringify(
			rows.map((r) => this.ts.translate(r.slug))
		);
		this._form
			.modal<TranslateAll>(this.formAll, [], {
				words,
				translates
			})
			.then((updated: TranslateAll) => {
				if (translates === updated.translates) {
					return;
				}
				const translated = JSON.parse(updated.translates);
				for (let i = 0; i < slugs.length; i++) {
					this._http.post('/api/translate/create', {
						appId: this.ts.appId,
						slug: slugs[i],
						lang: this.ts.language.code,
						translate: translated[i]
					});

					this.ts.translates[this.ts.language.code][slugs[i]] =
						translated[i];
				}
				this.ts.reset();
			});
	}

	set_language(code: string) {
		this.ts.set_language(
			this.ts.languages.find((l) => l.code === code) as Language
		);
	}
}
