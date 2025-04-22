# Button Module

The Button Module is a customizable Angular component for creating various types of buttons, including primary, secondary, success, danger, and more. This module provides an easy way to manage button styles, states, and events in your Angular applications.

## Features

- Supports multiple button types: primary, secondary, success, danger, warning, info, light, dark, link.
- Customizable classes for additional styling.
- Supports disabled state.
- Emits custom click events.

## Installation

To install this module, use the following command:
```cmd
waw add ngx-button
```
## Usage

### Importing the Module

First, import the `ButtonModule` into your Angular module:
```Typescript
import { ButtonModule } from '@your-namespace/button-module';

@NgModule({
  declarations: [...],
  imports: [
    ButtonModule,
    ...
  ],
  providers: [],
  bootstrap: [...]
})
export class AppModule { }
```
### Basic Example

Here's a basic example of how to use the button component in your Angular template:
```Typescript
<wbutton
  [type]="'primary'"
  [disabled]="false"
  (wClick)="onButtonClick()"
>
  Click Me
</wbutton>
```
### Handling Different Button Types

The `ButtonComponent` supports a variety of button types:

- `primary`
- `secondary`
- `success`
- `danger`
- `warning`
- `info`
- `light`
- `dark`
- `link`

Example:
```Typescript
<wbutton
  [type]="'danger'"
  (wClick)="onDangerClick()"
>
  Delete
</wbutton>
```
### Custom Classes

You can provide custom classes for additional styling:
```Typescript
<wbutton
  [type]="'success'"
  [class]="'custom-class'"
  (wClick)="onSuccessClick()"
>
  Save
</wbutton>
```
## API

### Inputs

- **type** (`string`): The type of button. Options include primary, secondary, success, danger, warning, info, light, dark, and link.
- **class** (`string`): Custom CSS classes to add to the button.
- **disabled** (`boolean`): Whether the button is disabled.
- **disableSubmit** (`boolean`): When true, the button will not submit the form, even if placed inside a form.
- **click** (`(() => void) | undefined`): Custom function to handle the click event.

### Outputs

- **wClick** (`EventEmitter<void>`): Emits an event when the button is clicked.

## Customization

You can customize the appearance of the button component using custom CSS or by passing additional classes through the `class` input.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Make sure to follow the contribution guidelines.

## License

This project is licensed under the MIT License.
