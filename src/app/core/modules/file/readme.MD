# Ngx File Component

The `ngx-file` component is an Angular component designed for handling file uploads, primarily for images, but it also supports other file types. It provides a flexible interface for uploading single or multiple files, with optional image cropping.

## Features

- Upload single or multiple files.
- Handle image cropping before upload.
- Customizable error handling.
- Flexible styling with CSS variables.
- Support for different file types.

## Installation

To install the module, use the following command:

waw add ngx-file

## Usage

### Importing the Module

First, import the `FileModule` into your Angular module:
```Typescript
import { FileModule } from '@your-namespace/ngx-file';

@NgModule({
  declarations: [...],
  imports: [
    FileModule,
    ...
  ],
  providers: [],
  bootstrap: [...]
})
export class AppModule { }
```
### Basic Example

Here’s a basic example of how to use the `ngx-file` component:
```Typescript
<wcard [sections]="['Section 1', 'Section 2', 'Section 3']">
  <ngx-file
    [label]="'Upload Profile Picture'"
    [isPhoto]="true"
    [multiple]="false"
    [value]="userProfilePicture"
    (update)="onFileUpdate($event)">
  </ngx-file>
</wcard>
```
### Handling Multiple Files

You can enable multiple file uploads by setting the `multiple` input property:
```Typescript
<ngx-file
  [label]="'Upload Gallery Images'"
  [isPhoto]="true"
  [multiple]="true"
  [value]="galleryImages"
  (update)="onGalleryUpdate($event)">
</ngx-file>
```
### Inputs

- **container** (`string`): The container where the file will be stored (default: `'general'`).
- **name** (`string`): The name of the file.
- **err** (`string`): Error message for handling errors.
- **label** (`string`): Label for the file input.
- **class** (`string`): Custom CSS class for styling.
- **imgStyle** (`object`): Style object for the image.
- **multiple** (`boolean`): Whether multiple files can be uploaded.
- **isPhoto** (`boolean`): Whether the file is a photo.
- **isRound** (`boolean`): Whether the image should be displayed as a round shape.
- **resize** (`number`): Resize factor for the image.
- **width** (`number`): Width for cropping the image.
- **height** (`number`): Height for cropping the image.
- **value** (`string | string[]`): The value of the uploaded file(s).

### Outputs

- **update** (`EventEmitter<string | string[]>`): Event emitter to notify parent components of updates.

### Methods

- **set()**: Initiates the file selection and cropping process.
- **uploadImage(dataUrl: string)**: Uploads the image to the server.

### SCSS Customization

The component supports CSS variables for easy customization. Below are some of the customizable variables:

- `--file-img-border-radius`: Border radius for the images (default: `8px`).
- `--file-add-bg`: Background color for the add button (default: `#007bff`).
- `--file-add-bg-hover`: Background color for the add button on hover (default: `#0056b3`).
- `--file-item-border-radius`: Border radius for file items (default: `4px`).

### Example of Custom CSS Variables

You can customize the styles using CSS variables in your global styles or component-specific styles:
```scss
:root {
  --file-img-border-radius: 50%;
  --file-add-bg: #28a745;
  --file-add-bg-hover: #218838;
  --file-item-border-radius: 10px;
}
```
## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Make sure to follow the contribution guidelines.

## License

This project is licensed under the MIT License.
