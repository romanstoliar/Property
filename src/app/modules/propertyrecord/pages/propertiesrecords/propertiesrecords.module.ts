import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PropertiesrecordsComponent } from './propertiesrecords.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: PropertiesrecordsComponent
	},
	{
		path: ':property_id',
		component: PropertiesrecordsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PropertiesrecordsComponent],
	providers: []
})
export class PropertiesrecordsModule {}
