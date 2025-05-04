import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'photo-gallery',
	templateUrl: './photo-gallery.component.html',
	styleUrls: ['./photo-gallery.component.scss'],
	standalone: false
})
export class PhotoGalleryComponent {
	@Input() photos: string[] = [];
	@Output() photosChange = new EventEmitter<string[]>();

	handleFileInput(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (!input.files) return;

		const files = Array.from(input.files);
		files.forEach((file) => {
			const reader = new FileReader();
			reader.onload = () => {
				const result = reader.result as string;
				this.photos.push(result);
				this.photosChange.emit(this.photos);
			};
			reader.readAsDataURL(file);
		});
	}

	removePhoto(index: number): void {
		this.photos.splice(index, 1);
		this.photosChange.emit(this.photos);
	}
}
