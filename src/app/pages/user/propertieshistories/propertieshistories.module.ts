import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PropertieshistoriesComponent } from './propertieshistories.component';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
	{
		path: ':property_id',
		component: PropertieshistoriesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PropertieshistoriesComponent, HistoryComponent]
})
export class PropertieshistoriesModule {}
