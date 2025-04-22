import { NgModule } from '@angular/core';
import { FileComponent } from './file.component';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FileCropperComponent } from './file-cropper/file-cropper.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
	declarations: [FileCropperComponent, FileComponent],
	exports: [FileComponent],
	imports: [ImageCropperModule, CommonModule, ButtonModule]
})
export class FileModule {}
