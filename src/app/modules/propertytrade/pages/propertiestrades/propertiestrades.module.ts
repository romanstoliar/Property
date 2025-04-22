import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PropertiestradesComponent } from './propertiestrades.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: PropertiestradesComponent
	},
	{
		path: ':property_id',
		component: PropertiestradesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PropertiestradesComponent],
	providers: []
})
export class PropertiestradesModule {}
