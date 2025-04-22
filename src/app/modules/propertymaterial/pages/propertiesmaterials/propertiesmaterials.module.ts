import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PropertiesmaterialsComponent } from './propertiesmaterials.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: PropertiesmaterialsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PropertiesmaterialsComponent],
	providers: []
})
export class PropertiesmaterialsModule {}
