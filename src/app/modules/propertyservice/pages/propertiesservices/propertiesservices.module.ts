import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PropertiesservicesComponent } from './propertiesservices.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: PropertiesservicesComponent
	},
	{
		path: ':provider_id',
		component: PropertiesservicesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PropertiesservicesComponent],
	providers: []
})
export class PropertiesservicesModule {}
