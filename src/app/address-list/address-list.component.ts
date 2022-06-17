import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from '../model/address';
import { AddressService } from '../service/address.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  addresses: Address[];

  constructor(private AddressService: AddressService,  private router: Router,) {
  }

  deleteAddress(id:any){
    this.AddressService.delete(id).subscribe(res => {
    })
    window.location.reload();
  }

  refreshPage() {

   }

  ngOnInit() {
    this.AddressService.findAll().subscribe(data => {
      this.addresses = data;
    });
  }
}
