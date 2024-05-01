import { Component } from '@angular/core';
import { Service, SpecificLocation, Girl, ShavingStatus, GirlCategory } from '../types';
import { InternalService } from '../internal.service';
import { otherFilterOptions } from '../constants';
import { cloneDeep } from 'lodash';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { isValidCategory, arraysOverlap } from '../helper-functions';
import { MultiSelectModule } from 'primeng/multiselect';

interface BasicFilterOption {
  name: string;
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MultiSelectModule, CommonModule, ButtonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  allServices: Service[] = [];
  allSpecificLocations: SpecificLocation[] = [];
  otherFilters: BasicFilterOption[] = otherFilterOptions;
  allGirls: Girl[] = [];

  selectedServices: Service[] = [];
  selectedSpecificLocaitons: SpecificLocation[] = [];
  selectedOtherFilters: BasicFilterOption[] = [];
  activeCategory: string = '';

  constructor(private internalService: InternalService) {
    this.internalService.allGirlsData.subscribe((data) => {
      if (data) {
        this.allGirls = data;
        this.applyFilter();
      }
    });
    this.internalService.allServicesData.subscribe((data) => {
      if (data) {
        this.allServices = data;
      }
    });
    this.internalService.specificLocationsData.subscribe((data) => {
      if (data) {
        this.allSpecificLocations = data;
      }
    });
    this.internalService.selectedServicesData.subscribe((data) => {
      if (data) {
        this.selectedServices = data;
      }
    });
    this.internalService.selectedSpecificLocationsData.subscribe((data) => {
      if (data) {
        this.selectedSpecificLocaitons = data;
      }
    });
    this.internalService.selectedOtherFiltersData.subscribe((data) => {
      if (data) {
        this.selectedOtherFilters = data;
      }
    });
    this.internalService.selectedCategoryData.subscribe((data) => {
      if (data) {
        this.activeCategory = data;
        this.applyFilter();
      }
    });
  }

  updateSelectedServices() {
    this.internalService.updateSelectedServices(this.selectedServices);
  }

  updateSelectedSpecificLocations() {
    this.internalService.updateSelectedSpecificLocations(this.selectedSpecificLocaitons);
  }

  updateSelectedOtherFilters() {
    this.internalService.updateSelectedOtherFilters(this.selectedOtherFilters);
  }

  clearAll() {}

  clearFilters() {
    this.selectedOtherFilters = [];
    this.selectedServices = [];
    this.selectedSpecificLocaitons = [];
    this.internalService.updateSelectedServices([]);
    this.internalService.updateSelectedSpecificLocations([]);
    this.internalService.updateSelectedOtherFilters([]);
    this.internalService.updateSelectedCategory('');
    this.internalService.filterGirls(this.allGirls);
  }

  applyFilter() {
    let filteredGirls: Girl[] = cloneDeep(this.allGirls);
    const selectedSpecificLocationIds = this.selectedSpecificLocaitons.map((location: SpecificLocation) => {
      return location.id;
    });
    const selectedOtherFilterNames = this.selectedOtherFilters.map((option: BasicFilterOption) => {
      return option.name;
    });
    const acceptedCategoryOptions: string[] = [];
    if (this.selectedOtherFilters.length) {
      if (selectedOtherFilterNames.includes(GirlCategory.GOLD)) {
        acceptedCategoryOptions.push(GirlCategory.GOLD);
      }
      if (selectedOtherFilterNames.includes(GirlCategory.SILVER)) {
        acceptedCategoryOptions.push(GirlCategory.SILVER);
      }
      if (selectedOtherFilterNames.includes(GirlCategory.BRONZE)) {
        acceptedCategoryOptions.push(GirlCategory.BRONZE);
      }
    }
    const acceptedShavingOptions: string[] = [];
    if (this.selectedOtherFilters.length) {
      if (selectedOtherFilterNames.includes(ShavingStatus.FULL)) {
        acceptedShavingOptions.push(ShavingStatus.FULL);
      }
      if (selectedOtherFilterNames.includes(ShavingStatus.TRIMED)) {
        acceptedShavingOptions.push(ShavingStatus.TRIMED);
      }
      if (selectedOtherFilterNames.includes(ShavingStatus.NONE)) {
        acceptedShavingOptions.push(ShavingStatus.NONE);
      }
    }
    filteredGirls = filteredGirls.filter((girl: Girl) => {
      if (this.activeCategory !== '') {
        if (isValidCategory(this.activeCategory)) {
          if (!girl.categories.includes(this.activeCategory)) {
            return false;
          }
        }
      }
      if (this.selectedServices.length) {
        const girlServices = girl.services;
        for (let selectedService of this.selectedServices) {
          if (!girlServices.some((service) => service.id === selectedService.id)) {
            return false;
          }
        }
      }
      if (this.selectedSpecificLocaitons.length) {
        if (girl.specificLocation) {
          if (!selectedSpecificLocationIds.includes(girl.specificLocation.id)) {
            return false;
          }
        }
      }
      if (this.selectedOtherFilters.length) {
        if (acceptedCategoryOptions.length) {
          if (!arraysOverlap(acceptedCategoryOptions, girl.categories)) {
            return false;
          }
        }
        if (acceptedShavingOptions.length) {
          if (!acceptedShavingOptions.includes(girl.attributes.shaving)) {
            return false;
          }
        }
        if (selectedOtherFilterNames.includes('No fuma')) {
          if (girl.attributes.smoking) {
            return false;
          }
        }
        if (selectedOtherFilterNames.includes('Atencion a domicilio')) {
          if (!girl.attributes.attentionAtClientPlace) {
            return false;
          }
        }
        if (selectedOtherFilterNames.includes('Atencion en hoteles')) {
          if (!girl.attributes.attentionAtHotels) {
            return false;
          }
        }
        if (selectedOtherFilterNames.includes('Con estacionamiento')) {
          if (!girl.parking) {
            return false;
          }
        }
        if (selectedOtherFilterNames.includes('Habla ingles')) {
          if (!girl.attributes.languages.includes('English')) {
            return false;
          }
        }
        if (selectedOtherFilterNames.includes('Cara visible')) {
          if (girl.bluredFace) {
            return false;
          }
        }
        if (selectedOtherFilterNames.includes('Sin tatuajes')) {
          if (girl.attributes.tatoos) {
            return false;
          }
        }
        if (selectedOtherFilterNames.includes('Atencion en dpto propio')) {
          if (!girl.attributes.attentionAtGirlPlace) {
            return false;
          }
        }
      }
      return true;
    });
    this.internalService.filterGirls(filteredGirls);
  }

  ngOnInit() {
    const serviceFilter = this.selectedServices.length > 0;
    const specificLocationFilter = this.selectedSpecificLocaitons.length > 0;
    const otherFilter = this.selectedOtherFilters.length > 0;
    const categoryFilter = this.activeCategory !== '';
    if (serviceFilter || specificLocationFilter || otherFilter || categoryFilter) {
      this.applyFilter();
    }
  }
}
