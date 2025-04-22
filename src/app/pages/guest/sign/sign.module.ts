import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SignComponent } from './sign.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SignComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SignComponent],
	providers: []
})
export class SignModule {}
