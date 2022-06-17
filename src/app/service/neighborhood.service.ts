import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Neighborhood } from '../model/neighborhood';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class NeighborhoodService {

  private neighborhoodUrl: string;

  constructor(private http: HttpClient) {
    this.neighborhoodUrl = 'http://localhost:8080/api/city/town/district/neighborhood/';
  }

  public findAll(): Observable<Neighborhood[]> {
    return this.http.get<Neighborhood[]>(this.neighborhoodUrl);
  }

  public findByDistrictID(id:any): Observable<Neighborhood[]> {
    return this.http.get<Neighborhood[]>(this.neighborhoodUrl + id);
  }

  public findByID(id:any): Observable<Neighborhood> {
    return this.http.get<Neighborhood>('http://localhost:8080/api/neighborhood/' + id);
  }
}