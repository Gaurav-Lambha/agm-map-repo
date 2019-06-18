import { HttpServiceService } from './http-service.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;
  _hotelData: any = [];
  _tempData: any = [];
  _positions: any = [];

  constructor(private _httpServiceService: HttpServiceService) {
    this.getData();
  }

  getData() {
    this._httpServiceService.getHotelList().subscribe(res => {
      this._hotelData = res;
      this._tempData = [...this._hotelData];
      console.log('Res>>', this._hotelData);
      this.setMapMarkers(this._hotelData);
    }, err => {
      console.log('Err>>', err.message);
    })
  }

  search(event: any, ) {
    const val = event.target.value.toLowerCase();
    const temp = this._tempData.filter(function (item) {
      return item.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this._hotelData = temp;
    this.setMapMarkers(this._hotelData);
  }

  selectHotel(data, selcted) {
    const temp = this._tempData.filter(function (item) {
      return item.id === data.id || !item.id;
    });
    if (selcted === 'marker') {
      this._hotelData = temp;
    }
    this.setMapMarkers(temp[0], true);
  }

  setMapMarkers(data, isSelectedHotel = false) {
    let mapObject = {};
    let orangeIcon = 'http://team-scale.com/TestData/ng_text_v15/orange_marker.png';
    const blueIcon = 'http://team-scale.com/TestData/ng_text_v15/blue_marker.png';
    if (!isSelectedHotel) {
      this._positions = [];
      data.forEach(element => {
        mapObject = {};
        mapObject['id'] = element.id,
          mapObject['lat'] = element.lat;
        mapObject['lon'] = element.lon;
        mapObject['iconUrl'] = blueIcon;
        this._positions.push(mapObject);
      });
    } else {      
      this._positions = this._positions.filter(item => {return item.iconUrl !== orangeIcon})
      mapObject = {};
      mapObject['id'] = data.id,
      mapObject['lat'] = data.lat;
      mapObject['lon'] = data.lon;
      mapObject['iconUrl'] = orangeIcon;
      this._positions.push(mapObject);
    }
  }

}
