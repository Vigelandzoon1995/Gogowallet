import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingService {
	loader: Loading;

	constructor(private loadingCtrl: LoadingController) { }

	init() {
		this.loader = this.loadingCtrl.create({
			spinner: 'crescent',
			showBackdrop: true,
			enableBackdropDismiss: false,
			content: '',
			cssClass: 'transparent-spinner'
		});
	}

	show() {
		if (!this.loader) {
			this.init();
		}
		this.loader.present();
	}

	hide() {
		if (this.loader) {
			this.loader.dismiss();
			this.loader = null;
		}
	}
}
