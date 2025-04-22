import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { PropertyrecordService } from '../../services/propertyrecord.service';
import { Propertyrecord } from '../../interfaces/propertyrecord.interface';

@Component({
	selector: 'propertyrecord-selector',
	templateUrl: './propertyrecord-selector.component.html',
	styleUrls: ['./propertyrecord-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Propertyrecord[] {
		return this._propertyrecordService.propertyrecords;
	}

	constructor(private _propertyrecordService: PropertyrecordService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
