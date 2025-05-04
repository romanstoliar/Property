import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CoreModule } from 'src/app/core/core.module';
import { MypropertiesComponent } from './myproperties.component';
import { MypropertyComponent } from './myproperty/myproperty.component';

const routes: Routes = [
	{
		path: '',
		component: MypropertiesComponent
	},
	{
		path: ':properties',
		component: MypropertiesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, FormsModule],
	declarations: [MypropertiesComponent, MypropertyComponent]
})
export class MypropertiesModule {}
