import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { AlertService, CoreService } from 'wacom';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';

@Component({
	templateUrl: './clients.component.html',
	styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
	columns = ['name', 'email'];
	form: FormInterface = this._form.getForm('user', {
		formId: 'user',
		title: 'User',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill Client name'
					},
					{
						name: 'Label',
						value: 'Name'
					}
				]
			},
			{
				name: 'Email',
				key: 'email',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill Client email'
					},
					{
						name: 'Label',
						value: 'Email'
					}
				]
			}
		]
	});
	users: User[] = [];
	private _page = 1;
	setUsers(page = this._page) {
		this._page = page;
		this._core.afterWhile(
			this,
			() => {
				this._us.get({ page }).subscribe((users) => {
					this.users.splice(0, this.users.length);
					this.users.push(...users);
				});
			},
			250
		);
	}
	config = {
		paginate: this.setUsers.bind(this),
		perPage: 20,
		setPerPage: this._us.setPerPage.bind(this._us),
		allDocs: false,
		create: () => {
			this._form
				.modal<User>(this.form, {
					label: 'Create',
					click: (created: unknown, close: () => void) => {
						this._us.create(created as User, {
							alert: this._translate.translate(
								'User.Client has been created'
							),
							callback: () => {
								this.setUsers();
								close();
							}
						});
					}
				})
				.then(this._us.create.bind(this));
		},
		update: (doc: User) => {
			this._form.modal<User>(this.form, [], doc).then((updated: User) => {
				this._core.copy(updated, doc);
				this._us.update(doc, {
					alert: this._translate.translate(
						'User.Client has been updated'
					)
				});
			});
		},
		delete: (user: User) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this client?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: () => {
							this._us.delete(user, {
								name: 'admin',
								alert: this._translate.translate(
									'User.Client has been deleted'
								),
								callback: () => {
									this.setUsers();
								}
							});
						}
					}
				]
			});
		}
	};
	constructor(
		private _translate: TranslateService,
		private _us: UserService,
		private _alert: AlertService,
		private _core: CoreService,
		private _form: FormService
	) {
		this.setUsers();
	}
}
