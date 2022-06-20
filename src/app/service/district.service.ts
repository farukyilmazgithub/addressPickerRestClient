import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { District } from '../model/district';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  private districtUrl: string;

  constructor(private http: HttpClient) {
    this.districtUrl = 'http://localhost:8080/api/city/district/';
  }

  public findAll(): Observable<District[]> {
    return this.http.get<District[]>(this.districtUrl);
  }

  public findByCityId(id:any): Observable<District[]> {
    return this.http.get<District[]>(this.districtUrl + id);
  }

  public findById(id:any): Observable<District> {
    return this.http.get<District>('http://localhost:8080/api/district/' + id);
  }
}