import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { MypropertiesComponent } from './myproperties.component';
import { Routes, RouterModule } from '@angular/router';
import { MypropertyComponent } from './myproperty/myproperty.component';

const routes: Routes = [
	{
		path: '',
		component: MypropertiesComponent
	},
	{
		path: ':properties/',
		component: MypropertiesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [MypropertiesComponent, MypropertyComponent]
})
export class MypropertiesModule {}
