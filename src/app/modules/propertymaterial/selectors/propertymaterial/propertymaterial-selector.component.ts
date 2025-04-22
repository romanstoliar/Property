import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { PropertymaterialService } from '../../services/propertymaterial.service';
import { Propertymaterial } from '../../interfaces/propertymaterial.interface';

@Component({
	selector: 'propertymaterial-selector',
	templateUrl: './propertymaterial-selector.component.html',
	styleUrls: ['./propertymaterial-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Propertymaterial[] {
		return this._propertymaterialService.propertymaterials;
	}

	constructor(private _propertymaterialService: PropertymaterialService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
