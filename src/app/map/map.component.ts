import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit  {

  /** The ID of the DOM element where the Leaflet map is to be anchored. */
  private static readonly MAP_DOM_ID = 'map'
  private map: L.Map

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
    this.initTiles();
    //this.initSearchBox();
  }

  protected onClick(e): void {
    var radius = 1000
    if (this.circle != undefined){
      this.removeLayer(this.circle);
    }
    this.circle = L.circle(e.latlng, 1000)
  	this.circle.addTo(this);
  }

  private initMap(): void {
    this.map = L.map('map').setView([40.416, -3.70], 6.5)
    this.map.on('click', this.onClick);
  }

  private initTiles(): void {
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
/*
  private initSearchBox(): void {
    let searchControl = new esri.Geocoding.Geosearch().addTo(this.map);
    let layerGroup = new L.LayerGroup().addTo(this.map);

    searchControl.on('results', function(data) {
      layerGroup.clearLayers();
      data.layer.results.array.forEach(result => {
        layerGroup.addLayer(L.marker(result.latlng));
      });
    });
  }
*/
}
