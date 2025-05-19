import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PropertiesmaterialsComponent } from './propertiesmaterials.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Додаємо для ngModel у select

const routes: Routes = [
	{
		path: '',
		component: PropertiesmaterialsComponent
	},
	{
		path: 'material/:category',
		component: PropertiesmaterialsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, FormsModule],
	declarations: [PropertiesmaterialsComponent],
	providers: []
})
export class PropertiesmaterialsModule {}
