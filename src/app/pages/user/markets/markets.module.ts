import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { MarketsComponent } from './markets.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: MarketsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [MarketsComponent]
})
export class MarketsModule {}
