import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
	selector: 'popover',
	templateUrl: 'popover.html'
})
export class PopoverComponent {
	items: any

	constructor(private viewCtrl: ViewController) {
		this.items = [
			{ item: "Sign Out" },
			{ item: "Settings" }
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
