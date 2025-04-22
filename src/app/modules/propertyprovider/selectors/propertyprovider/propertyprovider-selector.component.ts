import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { PropertyproviderService } from '../../services/propertyprovider.service';
import { Propertyprovider } from '../../interfaces/propertyprovider.interface';

@Component({
	selector: 'propertyprovider-selector',
	templateUrl: './propertyprovider-selector.component.html',
	styleUrls: ['./propertyprovider-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Propertyprovider[] {
		return this._propertyproviderService.propertyproviders;
	}

	constructor(private _propertyproviderService: PropertyproviderService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
