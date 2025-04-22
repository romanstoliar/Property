# ngx-translate

`ngx-translate` is an Angular module designed to provide multilingual support through the use of pipes, directives, and a service for managing translations.

## Installation

To install the module, run:
```cmd
waw add ngx-translate
```
## Usage

### Importing the Module

First, import the `TranslateModule` in your Angular application:
```Typescript
import { TranslateModule } from 'ngx-translate';

@NgModule({
  imports: [TranslateModule],
})
export class AppModule {}
```
### Using the Translate Pipe

The `translate` pipe can be used in templates to translate keys into their corresponding language strings:
```Typescript
<p>{{ 'home.title' | translate }}</p>
```
### Using the Translate Directive

The `translate` directive automatically translates the inner content of an element:
```Typescript
<h1 translate>home.title</h1>
```
### Service: TranslateService

The `TranslateService` provides methods for managing translations, setting languages, and retrieving translated strings.

### Example Usage

To translate a string programmatically, use the `TranslateService`:
```Typescript
import { TranslateService } from 'ngx-translate';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(private translateService: TranslateService) {}

  getTranslatedText() {
    return this.translateService.translate('home.title');
  }
}
```
### Managing Languages

You can set or switch the current language using the `TranslateService`:
```Typescript
this.translateService.set_language({ code: 'fr', name: 'French', origin: 'French' });
```
### Downloading Translations

You can download all translations as a JSON file:
```Typescript
this.translateService.download_json();
```
## License

MIT License. See LICENSE file for details.
