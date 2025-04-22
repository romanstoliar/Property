import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ProviderComponent } from './provider.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ProviderComponent
	},
	{
		path: ':provider_id',
		component: ProviderComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ProviderComponent]
})
export class ProviderModule {}
