# Ngx Select Component

The `ngx-select` component is an Angular component designed to provide a customizable select dropdown, supporting features like multiple selections, search, and custom templates for both the view and items.

## Features

- Single and multiple item selection.
- Customizable via templates for header and items.
- Optional search functionality.
- Clearable selection.
- Easy styling with CSS variables.

## Installation

To install the module, use the following command:
```cmd
waw add ngx-select
```
## Usage

### Importing the Module

First, import the `SelectModule` into your Angular module:
```Typescript
import { SelectModule } from '@your-namespace/ngx-select';

@NgModule({
  declarations: [...],
  imports: [
    SelectModule,
    ...
  ],
  providers: [],
  bootstrap: [...]
})
export class AppModule { }
```
### Basic Example

Here’s a basic example of how to use the `ngx-select` component:
```Typescript
<wselect
  [items]="dataItems"
  [placeholder]="'Select an option'"
  [label]="'Choose an item'"
  [multiple]="true"
  [clearable]="true"
  (modelChange)="onSelectionChange($event)">
</wselect>
```
### Custom Templates

You can use custom templates for the view and items:
```Typescript
<wselect
  [items]="dataItems"
  [placeholder]="'Select an option'"
  [label]="'Choose an item'"
  [view]="viewTemplate"
  [item]="itemTemplate"
  (modelChange)="onSelectionChange($event)">

  <ng-template #viewTemplate>
    <div>Custom View Here</div>
  </ng-template>

  <ng-template #itemTemplate let-item="item">
    <div>{{ item.name }}</div>
  </ng-template>
</wselect>
```
### Inputs

- **placeholder** (`string`): Placeholder text for the select input.
- **items** (`any[]`): List of items to display in the dropdown.
- **disabled** (`boolean`): Whether the select input is disabled.
- **clearable** (`boolean`): Whether the select input is clearable.
- **name** (`string`): The name of the property to display in the dropdown items.
- **value** (`string`): The property used as the value for each item.
- **multiple** (`boolean`): Whether multiple items can be selected.
- **label** (`string`): The label for the select input.
- **searchable** (`boolean`): Whether the dropdown is searchable.
- **searchableBy** (`string`): The property by which to search items.
- **select** (`any`): The selected value(s).
- **view** (`TemplateRef<any>`): Custom template for the view (header) of the select input.
- **item** (`TemplateRef<any>`): Custom template for each item in the dropdown.
- **search** (`TemplateRef<any>`): Custom template for the search input.

### Outputs

- **modelChange** (`EventEmitter<any>`): Event emitted when the selected values change.

### SCSS Customization

The component supports CSS variables for easy customization. Below are some of the customizable variables:

- `--c-sky`: Default color for the select border when active (default: `#3498db`).
- `--c-text`: Default text color (default: `#333333`).
- `--c-border`: Default border color (default: `#e5e5e5`).
- `--c-shadow`: Default shadow color (default: `#f3f3f3`).
- `--c-white`: Default background color (default: `#ffffff`).

### Example of Custom CSS Variables

You can customize the styles using CSS variables in your global styles or component-specific styles:
```css
:root {
  --c-sky: #3498db;
  --c-text: #333;
  --c-border: #e5e5e5;
  --c-shadow: #f3f3f3;
  --c-white: #ffffff;
}
```
## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Make sure to follow the contribution guidelines.

## License

This project is licensed under the MIT License.
