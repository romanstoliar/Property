import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { PropertyworkerService } from '../../services/propertyworker.service';
import { Propertyworker } from '../../interfaces/propertyworker.interface';

@Component({
	selector: 'propertyworker-selector',
	templateUrl: './propertyworker-selector.component.html',
	styleUrls: ['./propertyworker-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Propertyworker[] {
		return this._propertyworkerService.propertyworkers;
	}

	constructor(private _propertyworkerService: PropertyworkerService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
