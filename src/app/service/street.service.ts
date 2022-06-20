import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Street } from '../model/street';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StreetService {

  private townUrl: string;

  constructor(private http: HttpClient) {
    this.townUrl = 'http://localhost:8080/api/city/district/neighborhood/street/';
  }

  public findAll(): Observable<Street[]> {
    return this.http.get<Street[]>(this.townUrl);
  }

  public findByNeighborhoodId(id:any): Observable<Street[]> {
    return this.http.get<Street[]>(this.townUrl + id);
  }

  public findById(id:any): Observable<Street> {
    return this.http.get<Street>('http://localhost:8080/api/street/' + id);
  }
}
