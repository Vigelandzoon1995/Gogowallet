import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingService {
	loader: Loading;

	constructor(private loadingCtrl: LoadingController) {
	}

	initLoader() {
		this.loader = this.loadingCtrl.create({
			spinner: 'circles',
			showBackdrop: true,
			enableBackdropDismiss: false,
			content: '',
			cssClass: 'transparent-spinner'
		});
	}

	show() {
		this.initLoader();
		this.loader.present();
	}

	hide() {
		this.loader.dismiss();
	}
}
