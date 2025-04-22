import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { PropertytradeService } from '../../services/propertytrade.service';
import { Propertytrade } from '../../interfaces/propertytrade.interface';

@Component({
	selector: 'propertytrade-selector',
	templateUrl: './propertytrade-selector.component.html',
	styleUrls: ['./propertytrade-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Propertytrade[] {
		return this._propertytradeService.propertytrades;
	}

	constructor(private _propertytradeService: PropertytradeService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
