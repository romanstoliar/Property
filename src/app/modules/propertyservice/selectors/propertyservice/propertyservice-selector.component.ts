import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { PropertyserviceService } from '../../services/propertyservice.service';
import { Propertyservice } from '../../interfaces/propertyservice.interface';

@Component({
	selector: 'propertyservice-selector',
	templateUrl: './propertyservice-selector.component.html',
	styleUrls: ['./propertyservice-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Propertyservice[] {
		return this._propertyserviceService.propertyservices;
	}

	constructor(private _propertyserviceService: PropertyserviceService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
