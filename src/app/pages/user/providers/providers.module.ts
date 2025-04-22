import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ProvidersComponent } from './providers.component';
import { Routes, RouterModule } from '@angular/router';
import { ProviderComponent } from './provider/provider.component';

const routes: Routes = [
	{
		path: '',
		component: ProvidersComponent
	},
	{
		path: ':businesses/',
		component: ProvidersComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ProvidersComponent, ProviderComponent]
})
export class ProvidersModule {}
