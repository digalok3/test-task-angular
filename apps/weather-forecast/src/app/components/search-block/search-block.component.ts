import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
	selector: 'bp-search-block',
	templateUrl: './search-block.component.html',
	styleUrls: ['./search-block.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBlockComponent {
	@Input() loading$!: Observable<boolean>;
	@Input() searchFormGroup!: FormGroup;
	@Output() searchFormChangeEvt: EventEmitter<string> = new EventEmitter();

	onSearch(): void {
		this.searchFormChangeEvt.emit(this.searchFormGroup.get('searchWord')?.value);
	}
}
