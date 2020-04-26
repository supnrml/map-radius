import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeoSearchControl, EsriProvider } from 'leaflet-geosearch';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit  {

  /** The ID of the DOM element where the Leaflet map is to be anchored. */
  private static readonly MAP_DOM_ID = 'map'
  private map: L.Map
  private circleLayer: L.Layer = undefined
  private marker: L.Marker = undefined
  private houseIcon: L.Icon

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
    this.initTiles();
    this.initSearchBox();
  }

  private onClick(e): void {
    this.setHomePosition(e.latlng);
  }

  private onShowLocation(e): void {
    console.log('hola')
    console.log(e)
    this.setHomePosition({lat: e.location.y, lng: e.location.x});
    this.map.setView([e.location.y, e.location.x], 15);
  }

  private setHomePosition(latlng): void{
    console.log(latlng)
    var radius = 1000
    if (this.circleLayer != undefined) {this.map.removeLayer(this.circleLayer);}
    if (this.marker != undefined) {this.map.removeLayer(this.marker);}
    this.circleLayer = L.circle(latlng, radius)
    this.marker = L.marker(latlng, {icon: this.houseIcon}).addTo(this.map);
  	this.circleLayer.addTo(this.map);
  }

  private initMap(): void {
    this.map = L.map(MapComponent.MAP_DOM_ID).setView([40.416, -3.70], 6.5)
    this.map.on('dblclick', this.onClick.bind(this));
  }

  private initTiles(): void {
    this.houseIcon = L.icon({
    	iconUrl: 'https://image.flaticon.com/icons/png/512/69/69524.png',
    	iconSize: [18, 18],
    	iconAnchor: [9, 9]
    });

    var tilelayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoiZGF2aWRyb2xkYW4iLCJhIjoiY2s5aGUweXFiMHRvdDNsanc4aTlldmVpdiJ9.UAGJjfGE_wtXK-meHdIHIg', {
    	maxZoom: 18,
    	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    	id: 'mapbox/streets-v11',
    	tileSize: 512,
    	zoomOffset: -1
    })

    tilelayer.addTo(this.map);
  }

  private initSearchBox(): void {
    let searchControl = new GeoSearchControl({
      provider: new EsriProvider(),
      showMarker: false,
      retainZoomLevel: true,
      animateZoom: false
      //style: 'bar',
    });
    this.map.addControl(searchControl);
    this.map.on('geosearch/showlocation', this.onShowLocation.bind(this));
  }

}
