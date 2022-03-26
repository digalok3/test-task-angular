import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'bp-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
	@Input() dataSource!: any;
	@Input() displayedColumns!: string[];
}
