import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { WorkerprofileComponent } from './workerprofile.component';

const routes: Routes = [
	{
		path: ':worker_id',

		component: WorkerprofileComponent
	} /*,
	{
		path: '',
		component: WorkerprofileComponent
	}*/
];

@NgModule({
	declarations: [WorkerprofileComponent],
	imports: [RouterModule.forChild(routes), CoreModule]
})
export class WorkerprofileModule {}
