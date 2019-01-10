import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Environment, GoogleMap, GoogleMapOptions, GoogleMaps, Marker } from '@ionic-native/google-maps';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Coordinate from '../../shared/models/coordinate';
import User from '../../shared/models/user.model';

@IonicPage()
@Component({
	selector: 'page-track',
	templateUrl: 'track.html',
})
export class TrackPage {
	currentUser: User = null;
	map: GoogleMap;
	userCoordinates: Coordinate = new Coordinate();
	walletCoordinates: Coordinate = new Coordinate();

	constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private storage: Storage) {
		this.getCurrentUser();
		this.getLatestLocation();
	}

	ionViewDidLoad() {
		this.loadMap();
	}

	getCurrentUser() {
		this.storage.get('currentUser').then(
			(response) => this.currentUser = response
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
				'myLocation': true,   // (blue dot)
				'indoorPicker': true,
				'zoom': true,          // android only
				'mapToolbar': true     // android only
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
		this.walletCoordinates.latitude = 51.92003086849325;
		this.walletCoordinates.longitude = 4.470789797980501;
	}

	showLocation() {
		let walletMarker: Marker = this.map.addMarkerSync({
			title: 'Wallet',
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
