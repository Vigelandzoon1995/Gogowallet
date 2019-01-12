import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
	selector: 'budget-item-popover',
	templateUrl: 'budget-item-popover.html'
})
export class BudgetItemPopoverComponent {
	items: any

	constructor(private viewCtrl: ViewController) {
		this.items = [
			{ item: "Edit" },
			{ item: "Delete" }
		];
	}

	itemClick(item) {
		try {
			this.viewCtrl.dismiss(item);
		} catch (Nullpointerexception) {
			console.log(Nullpointerexception);
		}
	}
}
