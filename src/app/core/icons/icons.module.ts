import { NgModule } from '@angular/core';
/* components */
import { SpiderComponent } from './spider/spider.component';

const icons = [
	/* icons */
	SpiderComponent
];

@NgModule({
	declarations: icons,
	exports: icons
})
export class IconsModule {}
