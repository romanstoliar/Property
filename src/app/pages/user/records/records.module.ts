import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { RecordsComponent } from './records.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: RecordsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [RecordsComponent]
})
export class RecordsModule {}
