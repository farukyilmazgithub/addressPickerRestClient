import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, } from '@angular/forms';

import { Address } from '../model/address';
import { City } from '../model/city';
import { Town } from '../model/town';
import { District } from '../model/district';
import { Neighborhood } from '../model/neighborhood';

import { AddressService } from '../service/address.service';
import { CityService } from '../service/city.service';
import { TownService } from '../service/town.service';
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
  towns: Town[];
  districts: District[];
  neighborhoods: Neighborhood[];
  isSubmitted = false;
  cityName: string;
  townName: string;
  districtName: string;
  neighborhoodName: string;
  addressLine1asPopulation:string;
  constructor(
    
    private addressService: AddressService,
    private cityService: CityService,
    private townService: TownService,
    private districtService: DistrictService,
    private neighborhoodService: NeighborhoodService,
    private router: Router,
    public fb: FormBuilder) 
    {
        this.address = new Address();
    }
  
    registrationForm = this.fb.group({
    cityID: ["", [Validators.required]],
    townID: ['', [Validators.required]],
    districtID: ['', [Validators.required]],
    neighborhoodID: ['', [Validators.required]],
    population: ['', [Validators.required]],
      })

    get cityID() {
      return this.registrationForm.get('cityID');
    }
    get townID() {
      return this.registrationForm.get('townID');
    }
    get districtID() {
      return this.registrationForm.get('districtID');
    }
    get neighborhoodID() {
      return this.registrationForm.get('neighborhoodID');
    }
    get addressLine() {
      return this.registrationForm.get('addressLine');
    }
    get population() {
      return this.registrationForm.get('population');
    }


    changeCity(e: any) {
      this.cityID?.setValue(e.target.value, {
      });
      const toArray =  this.cityID?.value;
      const arr = toArray?.split(": ");
      let cityID = arr![1];
      this.cityService.findByID(cityID).subscribe(res => this.cityName = res.cityName);
      this.townService.findByCityID(cityID).subscribe(data => {
        this.towns = data;
      });
    }

    changeTown(e: any) {
      this.townID?.setValue(e.target.value, {
      });
      const toArray =  this.townID?.value;
      const arr = toArray?.split(": ");
      let townID = arr![1];
      this.address.city = this.cityName;
      this.townService.findByID(townID).subscribe(res => this.townName = res.townName);
      this.districtService.findByTownID(townID).subscribe(data => {
        this.districts = data;
      });
    }

    changeDistrict(e: any) {
      this.districtID?.setValue(e.target.value, {
      });

      const toArray =  this.districtID?.value;
      const arr = toArray?.split(": ");
      let districtID = arr![1];
      this.address.town = this.townName;
      this.districtService.findByID(districtID).subscribe(res => this.districtName = res.districtName);
      this.neighborhoodService.findByDistrictID(districtID).subscribe(data => {
        this.neighborhoods = data;
      });
    }

    changeNeighborhood(e: any) {
      this.neighborhoodID?.setValue(e.target.value, {
      });

      this.address.district = this.districtName;
      const toArray =  this.neighborhoodID?.value;
      const arr = toArray?.split(": ");
      let neighborhoodID = arr![1];
      this.neighborhoodService.findByID(neighborhoodID).subscribe(res => this.neighborhoodName = res.neighborhoodName);
      console.log(this.addressLine1asPopulation);
    }

    changeText(e: any) {
      this.population?.setValue(e.target.value, {
      });

      this.address.neighborhood = this.neighborhoodName;
      const toArray =  this.neighborhoodID?.value;
      const arr = toArray?.split(": ");
      let neighborhoodID = arr![1];
      this.neighborhoodService.findByID(neighborhoodID).subscribe(res => this.neighborhoodName = res.neighborhoodName);
      console.log(this.addressLine1asPopulation);
    }

  ngOnInit() {
    this.cityService.findAll().subscribe(data => {
      this.cties = data;
    });
  }

  onSubmit() {
    console.log(this.addressLine1asPopulation);
    
    this.address.addressLine1 = this.addressLine1asPopulation;
    this.addressService.save(this.address).subscribe(result => this.gotoAddressList());
  }

  gotoAddressList() {
    this.router.navigate(['/address']);
  }
}