import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoGalleryComponent } from 'src/app/components/photo-gallery/photo-gallery.component';

@NgModule({
	declarations: [PhotoGalleryComponent],
	exports: [PhotoGalleryComponent],
	imports: [CommonModule]
})
export class SharedModule {}
