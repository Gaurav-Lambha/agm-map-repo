import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

constructor(private http: HttpClient) { }


getHotelList()
{
return this.http.get('http://team-scale.com/TestData/ng_text_v15/api');
}
}




