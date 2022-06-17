import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { City } from '../model/city';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private cityUrl: string;

  constructor(private http: HttpClient) {
    this.cityUrl = 'http://localhost:8080/api/city/';
  }

  public findAll(): Observable<City[]> {
    return this.http.get<City[]>(this.cityUrl);
  }

  public findByID(id:any): Observable<City> {
    return this.http.get<City>(this.cityUrl + id);
  }
}