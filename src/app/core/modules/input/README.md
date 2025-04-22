# Input Module

The Input Module is a customizable Angular component designed to handle various types of input fields, including text, password, email, radio buttons, checkboxes, and more. This module provides an easy way to manage form inputs with built-in validation, error handling, and flexible event handling.

## Features

- Supports a wide range of input types including text, password, email, radio, checkbox, textarea, and more.
- Customizable validation and replacement logic.
- Emits events for value changes, form submissions, and blur events.
- Error handling with visual feedback.

## Installation

To install this module, use the following command:
```cmd
waw add ngx-input
```
## Usage

### Importing the Module

First, import the `InputModule` into your Angular module:
```Typescript
import { InputModule } from '@your-namespace/input-module';

@NgModule({
  declarations: [...],
  imports: [
    InputModule,
    ...
  ],
  providers: [],
  bootstrap: [...]
})
export class AppModule { }
```
### Basic Example

Here's a basic example of how to use the input component in your Angular template:
```Typescript
<winput
  [type]="'text'"
  [value]="'Sample Text'"
  [placeholder]="'Enter your name...'"
  (wChange)="onValueChange($event)"
  (wSubmit)="onSubmit($event)"
  (wBlur)="onBlur()"
></winput>
```
### Handling Different Input Types

The `InputComponent` supports a wide variety of input types:

- `text`
- `password`
- `email`
- `radio`
- `checkbox`
- `textarea`
- `number`
- `url`
- `date`
- `time`
- `file`
- `color`
- And more...

Example:
```Typescript
<winput
  [type]="'email'"
  [placeholder]="'Enter your email...'"
  (wChange)="onEmailChange($event)"
></winput>
```
### Custom Validation and Replacement

You can provide custom validation and replacement logic:
```Typescript
<winput
  [type]="'text'"
  [placeholder]="'Enter your name...'"
  [valid]="customValidator"
  [replace]="customReplacer"
  (wChange)="onValueChange($event)"
></winput>
```

## API

### Inputs

- **type** (`string`): The type of input. Supports all standard HTML input types.
- **value** (`string | number | boolean`): The current value of the input.
- **placeholder** (`string`): The placeholder text for the input.
- **disabled** (`boolean`): Whether the input is disabled.
- **focused** (`boolean`): Whether the input should be focused when initialized.
- **wClass** (`string`): Custom CSS classes for styling the input.
- **name** (`string`): The name attribute of the input.
- **label** (`string`): The label for the input.

### Outputs

- **wChange** (`EventEmitter<unknown>`): Emits the new value whenever the input value changes.
- **wSubmit** (`EventEmitter<unknown>`): Emits the value when the form is submitted (e.g., on pressing Enter).
- **wBlur** (`EventEmitter<void>`): Emits when the input loses focus.

## Customization

You can customize the appearance and behavior of the input component using custom CSS and by passing custom validation or replacement functions.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Make sure to follow the contribution guidelines.

## License

This project is licensed under the MIT License.
