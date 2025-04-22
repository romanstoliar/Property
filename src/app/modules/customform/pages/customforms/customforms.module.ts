import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CustomformsComponent } from './customforms.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: CustomformsComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		CustomformsComponent
	],
	providers: []

})

export class CustomformsModule { }
