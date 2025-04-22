import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';
import { FileModule } from 'src/app/core/modules/file/file.module';

const routes: Routes = [
	{
		path: '',
		component: ProfileComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, FileModule],
	declarations: [ProfileComponent],
	providers: []
})
export class ProfileModule {}
