# Card Module

The Card Module is a highly flexible Angular component designed to act as a container for various types of content, such as user profiles, product listings, or any custom content. It allows for easy customization and flexible layouts using CSS Flexbox.

## Features

- Flexible layout for various content types.
- Optional header and footer sections.
- Supports custom CSS classes for further styling.
- Uses CSS Flexbox for responsive and adaptive layout design.
- Accepts an array of strings to render multiple body sections.

## Installation

To install this module, use the following command:

waw add ngx-card

## Usage

### Importing the Module

First, import the `CardModule` into your Angular module:
```Typescript
import { CardModule } from '@your-namespace/card-module';

@NgModule({
  declarations: [...],
  imports: [
    CardModule,
    ...
  ],
  providers: [],
  bootstrap: [...]
})
export class AppModule { }
```
### Basic Example

Here’s a basic example of how to use the card component to display custom content:
```Typescript
<wcard>
  <div class="user-profile">
    <img src="user.jpg" alt="User Picture" />
    <h2>User Name</h2>
    <p>User bio goes here...</p>
  </div>
</wcard>
```
### Using Header and Footer

You can optionally add a header and footer to the card:
```Typescript
<wcard
  [header]="headerTemplate"
  [footer]="footerTemplate"
>
  <div class="product-details">
    <img src="product.jpg" alt="Product Picture" />
    <h2>Product Name</h2>
    <p>Product description goes here...</p>
    <p><strong>Price:</strong> $29.99</p>
  </div>
</wcard>

<ng-template #headerTemplate>
  <h3>Product Information</h3>
</ng-template>

<ng-template #footerTemplate>
  <button class="buy-now">Buy Now</button>
</ng-template>
```
### Using `sections`

The `sections` input allows you to pass an array of strings to the card component. Each string will be rendered as a separate section within the card body:
```Typescript
<wcard [sections]="['Section 1', 'Section 2', 'Section 3']">
  <div header>
    <h3>Header Content</h3>
  </div>

  <div footer>
    <button class="btn-primary">Contact</button>
  </div>
</wcard>
```
### Custom Classes

You can provide custom classes for additional styling:
```Typescript
<wcard [cardClass]="'custom-card-class'">
  <div class="custom-content">
    <!-- Custom content goes here -->
  </div>
</wcard>
```
## API

### Inputs

- **cardClass** (`string`): Custom CSS classes to apply to the card.
- **sections** (`string[] | null`): Array of strings representing multiple content sections in the body.
- **header** (`TemplateRef<any> | null`): Optional header template for the card.
- **footer** (`TemplateRef<any> | null`): Optional footer template for the card.

## Customization

You can customize the appearance of the card component using custom CSS or by passing additional classes through the `cardClass` input.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Make sure to follow the contribution guidelines.

## License

This project is licensed under the MIT License.
