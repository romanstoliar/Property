import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { MypropertyComponent } from './myproperty.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
const routes: Routes = [
	{
		path: ':property_id',
		component: MypropertyComponent
	},
	{
		path: '',
		component: MypropertyComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, SharedModule],
	declarations: [MypropertyComponent]
})
export class MypropertyModule {}
