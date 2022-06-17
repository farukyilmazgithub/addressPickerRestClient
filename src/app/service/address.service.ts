import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from '../model/address';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private addressUrl: string;

  constructor(private http: HttpClient) {
    this.addressUrl = 'http://localhost:8080/api/address';
  }

  public findAll(): Observable<Address[]> {
    return this.http.get<Address[]>(this.addressUrl);
  }

  public save(address: Address) {
    return this.http.post(this.addressUrl, address);
  }

  public delete(id:any) {
    return this.http.delete(this.addressUrl + "/" + id, {responseType: 'text'});
  }
}