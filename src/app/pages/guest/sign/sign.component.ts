import { Component } from '@angular/core';
import { AlertService, HashService, HttpService, UiService } from 'wacom';
import { Router } from '@angular/router';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { User } from 'src/app/modules/user/interfaces/user.interface';

interface RespStatus {
	email: string;
	pass: string;
}

@Component({
	templateUrl: './sign.component.html',
	styleUrls: ['./sign.component.scss'],
	standalone: false
})
export class SignComponent {
	form: FormInterface = this._form.getForm('sign', {
		formId: 'sign',
		title: 'Sign In / Sign Up',
		components: [
			{
				name: 'Email',
				key: 'email',
				focused: true,
				required: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter your email'
					},
					{
						name: 'Label',
						value: 'Email'
					}
				]
			},
			{
				name: 'Password',
				key: 'password',
				required: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter your password'
					},
					{
						name: 'Label',
						value: 'Password'
					}
				]
			},
			{
				name: 'Number',
				key: 'resetPin',
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter code from email'
					},
					{
						name: 'Label',
						value: 'code'
					}
				],
				hidden: true
			},
			{
				name: 'Button',
				fields: [
					{
						name: 'Label',
						value: "Let's go"
					},
					{
						name: 'Submit',
						value: true
					},
					{
						name: 'Click',
						value: (): void => {
							this.submit();
						}
					}
				]
			}
		]
	});

	user = {
		email: 'demo@webart.work',
		password: 'asdasdasdasd',
		resetPin: null
	};

	constructor(
		public us: UserService,
		public ui: UiService,
		private _alert: AlertService,
		private _http: HttpService,
		private _hash: HashService,
		private _router: Router,
		private _form: FormService,
		private _translate: TranslateService
	) {}

	submit(): void {
		if (!this.form.components[2].hidden && this.user.resetPin) {
			this.save();
		} else if (!this.user.email) {
			this._alert.error({
				text: this._translate.translate('Sign.Enter your email')
			});
		}

		if (!this.ui.valid(this.user.email)) {
			this._alert.error({
				text: this._translate.translate('Sign.Enter proper email')
			});
		} else if (!this.user.password) {
			this._alert.error({
				text: this._translate.translate('Sign.Enter your password')
			});
		} else {
			this._hash.set('email', this.user.email);

			this._http.post(
				'/api/user/status',
				this.user,
				(resp: RespStatus) => {
					if (resp.email && resp.pass) {
						this.login();
					} else if (resp.email) {
						this.reset();
					} else {
						this.sign();
					}
				}
			);
		}
	}

	login(): void {
		this._http.post('/api/user/login', this.user, this._set.bind(this));
	}

	sign(): void {
		this._http.post('/api/user/sign', this.user, this._set.bind(this));
	}

	reset(): void {
		this._http.post('/api/user/request', this.user, () => {
			this.form.components[2].hidden = false;
		});

		this._alert.info({
			text: 'Mail will sent to your email'
		});
	}

	save(): void {
		this._http.post('/api/user/change', this.user, (resp: boolean) => {
			if (resp) {
				this._alert.info({
					text: 'Password successfully changed'
				});
			} else {
				this._alert.error({
					text: 'Wrong Code'
				});
			}

			this.login();
		});
	}

	private _set = (user: User): void => {
		if (user) {
			const token = (user as unknown as { token: string }).token || '';

			if (token) {
				this._http.set('token', token);
			}

			localStorage.setItem('waw_user', JSON.stringify(user));

			this.us.setUser(user);

			this.us.get();

			this._router.navigateByUrl('/myproperties');
		} else {
			this._alert.error({
				text: 'Something went wrong'
			});
		}
	};
}
