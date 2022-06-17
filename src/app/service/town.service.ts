import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Town } from '../model/town';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TownService {

  private townUrl: string;

  constructor(private http: HttpClient) {
    this.townUrl = 'http://localhost:8080/api/city/town/';
  }

  public findAll(): Observable<Town[]> {
    return this.http.get<Town[]>(this.townUrl);
  }

  public findByCityID(id:any): Observable<Town[]> {
    return this.http.get<Town[]>(this.townUrl + id);
  }

  public findByID(id:any): Observable<Town> {
    return this.http.get<Town>('http://localhost:8080/api/town/' + id);
  }
}
