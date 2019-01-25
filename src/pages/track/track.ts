import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Environment, GoogleMap, GoogleMapOptions, GoogleMaps, Marker } from '@ionic-native/google-maps';
import { Storage } from '@ionic/storage';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import Coordinate from '../../shared/models/coordinate';
import User from '../../shared/models/user.model';
import { LocationService } from '../../shared/services/location.service';

@IonicPage()
@Component({
	selector: 'page-track',
	templateUrl: 'track.html',
})
export class TrackPage {
	currentUser: User = null;
	walletCoordinates: Coordinate = new Coordinate();
	lastTime: string;
	map: GoogleMap;

	constructor(public navCtrl: NavController, public navParams: NavParams, private locationService: LocationService,
		private geolocation: Geolocation, private storage: Storage, private alertCtrl: AlertController) { }

	ionViewDidEnter() {
		this.getCurrentUser();
	}

	getCurrentUser() {
		this.storage.get('currentUser').then(
			(response) => {
				this.currentUser = response;
				this.getLatestLocation();
			}
		);
	}

	loadMap() {
		// This code is necessary for browser
		Environment.setEnv({
			'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCkJEZtkCK1urLuwBRsooqttYDNIzsOBf4',
			'API_KEY_FOR_BROWSER_DEBUG': ''
		});

		let mapOptions: GoogleMapOptions = {
			controls: {
				'compass': true,
				'myLocationButton': true,
				'myLocation': true,		// (blue dot)
				'indoorPicker': true,
				'zoom': true,			// android only
				'mapToolbar': true		// android only
			},
			gestures: {
				scroll: true,
				tilt: true,
				zoom: true,
				rotate: true
			},
			camera: {
				target: {
					lat: 51.9171377,
					lng: 4.4845714
				},
				zoom: 14,
				tilt: 30
			},
		};

		this.map = GoogleMaps.create('map_canvas', mapOptions);
		this.showLocation();
	}

	getLatestLocation() {
		this.locationService.getLastLocation(this.currentUser.user_id).subscribe(
			(response) => {
				if (response != null && response.length > 0) {
					this.walletCoordinates.latitude = Number(response[0].latitude);
					this.walletCoordinates.longitude = Number(response[0].longitude);
					this.lastTime = response[0].time.replace(/\//g, '-');
				}

				this.loadMap();
			},
			(error) => {
				// Show error message
				const alert = this.alertCtrl.create({
					title: 'Error',
					subTitle: 'An error occured while retrieving last known location. Please try again!',
					buttons: [
						{
							text: 'OK',
						}
					]
				});
				alert.present();
			}
		);
	}

	showLocation() {
		if (this.walletCoordinates.latitude != null && this.walletCoordinates.longitude != null) {
			let walletMarker: Marker = this.map.addMarkerSync({
				title: 'Time of location: ' + this.lastTime,
				icon: {
					url: 'assets/icon/wallet_marker.png',
					size: {
						width: 32,
						height: 32
					}
				},
				animation: 'DROP',
				position: {
					lat: this.walletCoordinates.latitude,
					lng: this.walletCoordinates.longitude
				}
			});

			this.map.moveCamera({
				target: { lat: this.walletCoordinates.latitude, lng: this.walletCoordinates.longitude },
				zoom: 14,
				tilt: 30
			});
		}
	}
}
