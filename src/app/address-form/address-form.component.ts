import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, } from '@angular/forms';

import { Address } from '../model/address';
import { City } from '../model/city';
import { Street } from '../model/street';
import { District } from '../model/district';
import { Neighborhood } from '../model/neighborhood';

import { AddressService } from '../service/address.service';
import { CityService } from '../service/city.service';
import { StreetService } from '../service/street.service';
import { DistrictService } from '../service/district.service';
import { NeighborhoodService } from '../service/neighborhood.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})

export class AddressFormComponent {

  address: Address;
  cties: City[];
  districts: District[];
  neighborhoods: Neighborhood[];
  streets: Street[];
  addressLine1: string;
  addressLine2: string;
  description: string;
  isSubmitted = false;
  constructor(
    
    private addressService: AddressService,
    private cityService: CityService,
    private districtService: DistrictService,
    private neighborhoodService: NeighborhoodService,
    private streetService: StreetService,
    private router: Router,
    public fb: FormBuilder) 
    {
        this.address = new Address();
    }
  
    registrationForm = this.fb.group({
    cityId: ["", [Validators.required]],
    districtId: ['', [Validators.required]],
    neighborhoodId: ['', [Validators.required]],
    streetId: ['', [Validators.required]],
    address : new FormBuilder()
    })

    get cityId() {
      return this.registrationForm.get('cityId');
    }
    get districtId() {
      return this.registrationForm.get('districtId');
    }
    get neighborhoodId() {
      return this.registrationForm.get('neighborhoodId');
    }    
    get streetId() {
      return this.registrationForm.get('streetId');
    }

    changeCity(e: any) {
      this.cityId?.setValue(e.target.value, {
      });
      const toArray =  this.cityId?.value;
      const arr = toArray?.split(": ");
      let cityId = arr![1];
      this.cityService.findById(cityId).subscribe(res =>  this.address.city = res.cityName);
      this.districtService.findByCityId(cityId).subscribe(data => {
        this.districts = data;
      });
    }

    changeDistrict(e: any) {
      this.districtId?.setValue(e.target.value, {
      });

      const toArray =  this.districtId?.value;
      const arr = toArray?.split(": ");
      let districtId = arr![1];
      this.districtService.findById(districtId).subscribe(res => this.address.district = res.districtName);
      this.neighborhoodService.findByDistrictId(districtId).subscribe(data => {
        this.neighborhoods = data;
      });
    }

    changeNeighborhood(e: any) {
      this.neighborhoodId?.setValue(e.target.value, {
      });

      const toArray =  this.neighborhoodId?.value;
      const arr = toArray?.split(": ");
      let neighborhoodId = arr![1];
      this.neighborhoodService.findById(neighborhoodId).subscribe(res => this.address.neighborhood = res.neighborhoodName);
      this.streetService.findByNeighborhoodId(neighborhoodId).subscribe(data => {
        this.streets = data;
      });
    }

    changeStreet(e: any) {
      this.streetId?.setValue(e.target.value, {
      });
      const toArray =  this.streetId?.value;
      const arr = toArray?.split(": ");
      let streetId = arr![1];
      this.streetService.findById(streetId).subscribe(res => this.address.street = res.streetName);
    }

  ngOnInit() {
    this.cityService.findAll().subscribe(data => {
      this.cties = data;
    });
  }

  onSubmit() {
    this.address.addressLine1 = this.addressLine1;
    this.address.addressLine2 = this.addressLine2;
    this.address.description = this.description;
    this.addressService.save(this.address).subscribe(result => this.gotoAddressList());
  }

  gotoAddressList() {
    this.router.navigate(['/address']);
  }
}