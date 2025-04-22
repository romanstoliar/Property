# ngx-table

`ngx-table` is an Angular component for creating customizable and responsive tables with features like sorting, pagination, search, and action buttons.

## Installation

To install the module, run:
```cmd
waw add ngx-table
```
## Usage

### Basic Usage

To use `ngx-table`, first import the module in your Angular application:
```Typescript
import { TableModule } from 'ngx-table';

@NgModule({
  imports: [TableModule],
})
export class AppModule {}
```
### Component Inputs

- `title`: The title of the table.
- `columns`: Array of column definitions with properties `title` and `field`.
- `rows`: Array of data rows to display in the table.
- `config`: Configuration object for the table with options like `perPage`, `pageSizeOptions`, `searchable`, etc.

### Example
```Typescript
<wtable [title]="'User List'" [columns]="columns" [rows]="rows" [config]="config"></wtable>
```
### Configuration

- `pageSizeOptions`: Array of numbers for items per page options.
- `perPage`: Number of items to show per page (-1 for all).
- `page`: Current page number.
- `searchable`: Boolean, whether to enable search functionality.
- `create`: Function to execute when the "Add New" button is clicked.

### Custom Templates

`ngx-table` allows you to use custom templates for cells and actions:
```Typescript
<ng-template cell="email" let-row>
  <a [href]="'mailto:' + row.email">{{ row.email }}</a>
</ng-template>
<ng-template actions>
  <button (click)="edit(row)">Edit</button>
  <button (click)="delete(row)">Delete</button>
</ng-template>

<ng-template customEdit>
  <form (ngSubmit)="submit()">
    <div>
      <label *ngFor="let field of doc">
        <span>{{field.label}}</span>
        <input [(ngModel)]="field.name">
      </label>
    </div>
    <div>
      <button class="_cancel" type="button" (click)="doc=null;">Cancel</button>
      <button class="_create" type="submit">{{doc._id && 'Save' || 'Create'}}</button>
    </div>
  </form>
</ng-template>
```

### Styling

Customize the appearance of the table using the available CSS variables.

## License

MIT License. See LICENSE file for details.
