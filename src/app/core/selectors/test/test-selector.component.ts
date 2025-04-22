import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges
} from '@angular/core';
import { TestService, Test } from 'src/app/core/services/test.service';

@Component({
	selector: 'test-selector',
	templateUrl: './test-selector.component.html',
	styleUrls: ['./test-selector.component.scss']
})
export class TestSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() onChange = new EventEmitter();

	get items(): Test[] {
		return this._testService.tests;
	}

	constructor(private _testService: TestService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
