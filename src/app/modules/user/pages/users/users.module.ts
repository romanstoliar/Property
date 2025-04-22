import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { UsersComponent } from './users.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: UsersComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [UsersComponent],
	providers: []
})
export class UsersModule {}
