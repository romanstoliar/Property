import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialsComponent } from './materials.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: MaterialsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [MaterialsComponent]
})
export class MaterialsModule {}
