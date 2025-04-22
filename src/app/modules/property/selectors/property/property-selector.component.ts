import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../interfaces/property.interface';

@Component({
	selector: 'property-selector',
	templateUrl: './property-selector.component.html',
	styleUrls: ['./property-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Property[] {
		return this._propertyService.propertys;
	}

	constructor(private _propertyService: PropertyService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
