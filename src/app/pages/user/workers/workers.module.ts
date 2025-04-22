import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { WorkersComponent } from './workers.component';
import { Routes, RouterModule } from '@angular/router';
import { WorkerComponent } from './worker/worker.component';

const routes: Routes = [
	{
		path: '',
		component: WorkersComponent
	},
	{
		path: ':workers/',
		component: WorkersComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [WorkersComponent, WorkerComponent]
})
export class WorkersModule {}
