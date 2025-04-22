import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PropertyhistoryComponent } from './propertyhistory.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: ':record_id',
		component: PropertyhistoryComponent
	},
	{
		path: ':provider_id',
		component: PropertyhistoryComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PropertyhistoryComponent]
})
export class PropertyhistoryModule {}
