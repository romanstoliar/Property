import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CoreService, HttpService, StoreService } from 'wacom';
import { languages } from './languages';

export interface Language {
	code: string;
	name: string;
	origin: string;
}

export interface Word {
	slug: string;
	page: string;
	word: string;
	translate: string;
	translate_id?: string;
	_id?: string;
}

@Injectable({
	providedIn: 'root'
})
export class TranslateService {
	readonly allLanguages = languages;
	readonly appId = (environment as unknown as { appId: string }).appId;

	constructor(
		private store: StoreService,
		private http: HttpService,
		private _core: CoreService
	) {
		this.store.getJson('translates', (translates) => {
			if (translates) {
				this.translates = translates || {};
			}
		});

		this._core.on('languages').subscribe((languages: Language[]) => {
			this.languages = languages;
		});

		this.store.getJson('words', (words) => {
			if (words) {
				this.words = words;
			}
		});

		this.store.getJson('language', (language: Language) => {
			if (language) {
				this.set_language(language);
			}
		});

		this.http.get('/api/translate/get' + (this.appId ? '/' + this.appId : ''), (obj) => {
			if (obj) {
				this.translates = obj;
				this.store.setJson('translates', this.translates);
			}
		});

		this.http.get('/api/word/get' + (this.appId ? '/' + this.appId : ''), (arr) => {
			if (arr) {
				this.words = arr;
				this.store.setJson('words', this.words);
				for (let i = 0; i < arr.length; i++) {
					if (this.pages.indexOf(arr[i].page) < 0) {
						this.pages.push(arr[i].page);
					}
				}
				this._wordsLoaded = true;
			}
		});
	}

	// Array of all words for translation
	words: Word[] = [];

	// Array of pages for words
	pages: string[] = [];

	/**
	 * Deletes a word and its associated translation from the backend and local state.
	 * @param word - The word object to delete.
	 */
	delete(word: Word) {
		for (let i = this.words.length - 1; i >= 0; i--) {
			if (this.words[i]._id == word._id) this.words.splice(i, 1);
		}

		this.http.post('/api/word/delete' + (this.appId ? '/' + this.appId : ''), {
			_id: word._id
		});

		this.http.post('/api/translate/delete' + (this.appId ? '/' + this.appId : ''), {
			slug: word.slug
		});
	}

	/* Translate Use */

	// Array of supported languages
	languages: Language[] = (
		environment as unknown as { languages: Language[] }
	).languages
		? (environment as unknown as { languages: Language[] }).languages
		: [
			{
				code: 'en',
				name: 'English',
				origin: 'English'
			}
		];

	// Currently selected language
	language: Language = this.languages.length
		? this.languages[0]
		: {
			code: 'en',
			name: 'English',
			origin: 'English'
		};

	/**
	 * Sets the current language and updates the translations.
	 * @param language - The language object to set as current.
	 */
	set_language(language: Language) {
		if (language) {
			this.http.post('/api/translate/set', {
				appId: this.appId,
				language: language.code
			});

			this.language = language;

			this.reset();

			this.store.setJson('language', language);
		}
	}

	/**
	 * Switches to the next available language.
	 */
	next_language() {
		for (let i = 0; i < this.languages.length; i++) {
			if (this.languages[i].code === this.language.code) {
				if (this.languages.length - 1 === i) {
					this.language = this.languages[0];
				} else {
					this.language = this.languages[i + 1];
				}
				break;
			}
		}

		this.store.setJson('language', this.language);
	}

	// Dictionary of translations
	translates: any = {};

	resets: any = {};
	now = Date.now();

	/**
	 * Resets all translations for the current language.
	 */
	reset() {
		this.now = Date.now();
		for (const slug in this.resets) {
			if (Array.isArray(this.resets[slug])) {
				for (let i = 0; i < this.resets[slug].length; i++) {
					if (
						this.translates[this.language.code] &&
						this.translates[this.language.code][slug]
					) {
						this.resets[slug][i](
							this.translates[this.language.code][slug]
						);
					} else {
						this.resets[slug][i](this._slug2name(slug));
					}
				}
			}
		}
	}

	/**
	 * Translates a slug into its corresponding string for the current language.
	 * @param slug - The translation key.
	 * @param reset - Optional reset callback to handle dynamic updates.
	 * @returns The translated string.
	 */
	translate(slug: string, reset?: (translate: string) => void) {
		if (!slug) return '';

		if (slug.split('.').length < 2) return slug;

		if (!this.resets[slug]) this.resets[slug] = [];

		if (reset) {
			this.resets[slug].push(reset);
		}

		if (!this.translates[this.language.code]) {
			this.translates[this.language.code] = {};
		}

		if (this.translates[this.language.code][slug]) {
			return this.translates[this.language.code][slug];
		}

		if (
			this.words
				.map((w) => w?.slug || '')
				.filter((w) => !!w)
				.indexOf(slug) < 0
		) {
			this.create_word(slug);
		}

		return this._slug2name(slug);
	}

	private _created: Record<string, boolean> = {};
	private _wordsLoaded = false;

	/**
	 * Creates a new word in the backend and adds it to the list of words.
	 * @param slug - The translation key to create.
	 */
	create_word(slug: string) {
		if (this._created[slug]) {
			return;
		}

		if (this._wordsLoaded) {
			this._created[slug] = true;

			this.http.post(
				'/api/word/create',
				{
					appId: this.appId,
					slug: slug,
					word: this._slug2name(slug),
					page: slug.split('.')[0],
					lang: this.language.code
				},
				(word) => {
					if (word) {
						this.words.push(word);
					}
				}
			);
		} else {
			setTimeout(() => {
				this.create_word(slug);
			}, 500);
		}
	}

	/**
	 * Updates an existing translation in the backend and triggers any associated reset callbacks.
	 * @param slug - The translation key.
	 * @param languageCode - The language code for the translation.
	 * @param translate - The translated string.
	 */
	update_translate(slug: string, languageCode: string, translate: string) {
		this._core.afterWhile(this, () => {
			this.http.post('/api/translate/create', {
				appId: this.appId,
				slug,
				translate,
				lang: languageCode
			});

			this.store.setJson('translates', this.translates);

			if (
				this.language.code === languageCode &&
				Array.isArray(this.resets[slug])
			) {
				for (let i = 0; i < this.resets[slug].length; i++) {
					if (typeof this.resets[slug][i] === 'function') {
						this.resets[slug][i]();
					}
				}
			}
		});
	}

	/**
	 * Downloads the translations as a JSON file.
	 */
	download_json() {
		this.http.get('/api/translate/get_translates', (obj) => {
			const dataStr =
				'data:text/json;charset=utf-8,' +
				encodeURIComponent(JSON.stringify(this.translates));

			const link = document.createElement('a');

			link.href = dataStr;

			link.download = 'translate.json';

			link.click();

			link.remove();
		});
	}

	/**
	 * Converts a slug into a more human-readable name.
	 * @param slug - The slug to convert.
	 * @returns The human-readable name.
	 */
	private _slug2name(slug: string) {
		return slug.substr(slug.indexOf('.') + 1);
	}
}
