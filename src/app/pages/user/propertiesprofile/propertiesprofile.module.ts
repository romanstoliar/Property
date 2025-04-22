import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PropertiesprofileComponent } from './propertiesprofile.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: PropertiesprofileComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PropertiesprofileComponent]
})
export class PropertiesprofileModule {}
