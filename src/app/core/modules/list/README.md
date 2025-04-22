# Ngx List Component

The `ngx-list` component is an Angular component designed for displaying a list of items with advanced features like infinite scrolling, pull to refresh, and loading more items on demand.

## Features

- Infinite scrolling to load more items as the user scrolls.
- Pull to refresh functionality.
- Load more items with a button click.
- Flexible and customizable layout.
- Adjustable step for loading more items.

## Installation

To install the module, use the following command:
```cmd
waw add ngx-list
```
## Usage

### Importing the Module

First, import the `ListModule` into your Angular module:
```Typescript
import { ListModule } from '@your-namespace/ngx-list';

@NgModule({
  declarations: [...],
  imports: [
    ListModule,
    ...
  ],
  providers: [],
  bootstrap: [...]
})
export class AppModule { }
```
### Basic Example

Here’s a basic example of how to use the `ngx-list` component:
```Typescript
<wlist [items]="dataItems" [step]="50">
  <ng-template let-item>
    <div class="list-item">
      {{ item.name }}
    </div>
  </ng-template>
</wlist>
```
### Pull to Refresh

The `ngx-list` component automatically supports pull to refresh. Simply swipe down at the top of the list to refresh the content.

### Load More Button

When there are more items to load, a "Load More" button will appear at the bottom of the list:
```Typescript
<wlist [items]="dataItems" [step]="50">
  <ng-template let-item>
    <div class="list-item">
      {{ item.name }}
    </div>
  </ng-template>
</wlist>
```
### Inputs

- **items** (`any[]`): The array of items to be displayed in the list.
- **limit** (`number`): The initial limit on the number of items to display (default: 100).
- **step** (`number`): The number of items to load each time more items are requested (default: 100).

### Methods

- **loadMore()**: Manually loads more items into the list.
- **refresh()**: Refreshes the list by resetting the limit and optionally reloading the items.

### SCSS Customization

The component supports CSS variables for easy customization. Below are some of the customizable variables:

- `--refresh-bg`: Background color for the pull-to-refresh message (default: `#f0f0f0`).
- `--refresh-color`: Text color for the pull-to-refresh message (default: `#666`).
- `--load-more-bg`: Background color for the load-more button (default: `#007bff`).
- `--load-more-bg-hover`: Background color for the load-more button on hover (default: `#0056b3`).

### Example of Custom CSS Variables

You can customize the styles using CSS variables in your global styles or component-specific styles:
```css
:root {
  --refresh-bg: #e0e0e0;
  --refresh-color: #444;
  --load-more-bg: #28a745;
  --load-more-bg-hover: #218838;
}
```
## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Make sure to follow the contribution guidelines.

## License

This project is licensed under the MIT License.
