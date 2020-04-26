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

  private initMap(): void {
    this.map = L.map(MapComponent.MAP_DOM_ID, {
      center: [ 40.416902, -3.703514 ],
      zoom: 6
    });
  }

  private initTiles(): void {
    var map = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoiZGF2aWRyb2xkYW4iLCJhIjoiY2s5aGUweXFiMHRvdDNsanc4aTlldmVpdiJ9.UAGJjfGE_wtXK-meHdIHIg', {
    	maxZoom: 18,
    	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    	id: 'mapbox/streets-v11',
    	tileSize: 512,
    	zoomOffset: -1
    })

    /*map.setLayoutProperty('country-label', 'text-field', [
      'get',
      'name_es'
    ]);*/

    map.addTo(this.map);
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
