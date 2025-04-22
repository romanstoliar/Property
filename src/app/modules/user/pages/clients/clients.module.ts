import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ClientsComponent } from './clients.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: ClientsComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		ClientsComponent
	],
	providers: []

})

export class ClientsModule { }
