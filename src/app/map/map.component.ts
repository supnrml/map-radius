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
    L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(this.map);
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
