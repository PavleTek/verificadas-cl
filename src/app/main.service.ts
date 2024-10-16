import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { InternalService } from './internal.service';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { City, Girl, GirlCategory, SpecificLocation } from './types';
import { compileFactoryFunction } from '@angular/compiler';

interface Response {
  status: number;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private baseMultimediaUrl = environment.baseMultimediaUrl;
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private internalService: InternalService) {}

  async getGirlsByCityId(cityId: string | number | any, categoryName?: GirlCategory): Promise<any> {
    try {
      const response = await this.http.get<Girl[]>(`${this.baseUrl}/girl-api/girls/city/${cityId}`).toPromise();
      if (response !== undefined && response !== null) {
        if (categoryName) {
          this.internalService.updateGirlData(response, categoryName);
        } else {
          this.internalService.updateGirlData(response);
        }
      }
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getGirlsBySpecificLocationName(locationName: string | any): Promise<any> {
    try {
      const response = await this.http.get<Girl[]>(`${this.baseUrl}/girl-api/girls/specificLocation/${locationName}`).toPromise();
      if (response !== undefined && response !== null) {
        this.internalService.updateGirlData(response);
      }
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getAllCities(): Promise<any> {
    try {
      const response = await this.http.get<Response>(`${this.baseUrl}/girl-api/cities`).toPromise();
      if (response) {
        this.internalService.udpateCities(response.data);
      }
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getAllCategories(): Promise<any> {
    try {
      const response = await this.http.get<Response>(`${this.baseUrl}/girl-api/category`).toPromise();
      if (response) {
        this.internalService.updateSeoCategories(response.data);
      }
    } catch (error) {
      console.error(`Error while fetching seo categories data`, error);
      return error;
    }
  }

  async getAndSetCityByName(cityName: string): Promise<any> {
    try {
      const response = await firstValueFrom(this.http.get<Response>(`${this.baseUrl}/girl-api/cities`));
      const cities = response.data;
      this.internalService.udpateCities(cities);
      const newActiveCity = cities.find((city: City) => city.name === cityName);
      this.internalService.updateActiveCity(newActiveCity);
      return newActiveCity;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getAllServices(): Promise<any> {
    try {
      const response = await this.http.get<Response>(`${this.baseUrl}/girl-api/services`).toPromise();
      if (response) {
        this.internalService.updateServices(response.data);
      }
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getAllNationalities(): Promise<any> {
    try {
      const response = await this.http.get<Response>(`${this.baseUrl}/girl-api/nationality`).toPromise();
      if (response) {
        this.internalService.updateNationalities(response.data);
      }
      return response;
    } catch (error) {
      console.error('Error updating nationalities:', error);
      throw error;
    }
  }

  async getAllEthnicities(): Promise<any> {
    try {
      const response = await this.http.get<Response>(`${this.baseUrl}/girl-api/ethnicity`).toPromise();
      if (response) {
        this.internalService.updateEthnicities(response.data);
      }
      return response;
    } catch (error) {
      console.error('Error updating ethnicities:', error);
      throw error;
    }
  }

  async getAllSpecificLocations(activeLocationName?: string): Promise<any> {
    try {
      const response = await this.http.get<Response>(`${this.baseUrl}/girl-api/specificLocation`).toPromise();
      if (response) {
        this.internalService.updateSpecificLocations(response.data);
        // Here I want that if a activeLocationName was passed, I watn to find it inside the Data and get the specific whole value
        if (activeLocationName) {
          const foundLocation = response.data.find((location: SpecificLocation) => location.name.toLowerCase() === activeLocationName.toLowerCase());
          if (foundLocation) {
            this.internalService.updateActiveSpecificLocation(foundLocation);
          }
        }
      }
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getGirlById(girlId: number | string): Promise<Girl | undefined> {
    try {
      const response = await firstValueFrom(this.http.get<Response>(`${this.baseUrl}/girl-api/girl/${girlId}`));
      if (response.status === 200) {
        const girl = response.data;
        return girl;
      }
      return undefined;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async initiateEverything(): Promise<any> {
    try {
      const citiesResponse = await this.getAllCities();
      const initialCity = citiesResponse.data[0];
      this.internalService.updateActiveCity(initialCity);
      if (initialCity) {
        await this.getGirlsByCityId(initialCity.id);
      }
      await this.getAllSpecificLocations();
      await this.getAllServices();
      await this.getAllNationalities();
      await this.getAllEthnicities();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async initiateEverythingByCity(cityName: string): Promise<any> {
    try {
      const activeCity = await this.getAndSetCityByName(cityName);
      await this.getGirlsByCityId(activeCity.id);
      await this.getAllSpecificLocations();
      await this.getAllServices();
      await this.getAllNationalities();
      await this.getAllEthnicities();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async initiateEverythingBySpecificLocation(cityName: string, locationName: string): Promise<any> {
    try {
      const activeCity = await this.getAndSetCityByName(cityName);
      await this.getGirlsBySpecificLocationName(locationName);
      await this.getAllSpecificLocations(locationName);
      await this.getAllServices();
      await this.getAllNationalities();
      await this.getAllEthnicities();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getActiveSeoCategory(categoryName: GirlCategory) {
    
  };

  async initiateEverythingByCategory(cityName: string, categoryName: GirlCategory): Promise<any> {
    try {
      const activeCity = await this.getAndSetCityByName(cityName);
      await this.getGirlsByCityId(activeCity.id, categoryName);
      await this.getAllCategories();
      // this line sets the active category which is important for the header to work
      this.internalService.updateSelectedCategory(categoryName);
      await this.getAllSpecificLocations();
      await this.getAllServices();
      await this.getAllNationalities();
      await this.getAllEthnicities();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  filterGirlsByCategory(categoryName: string): void {
    let allGirls: Girl[] = [];
    this.internalService.allGirlsData.subscribe((data: Girl[]) => {
      if (data) {
        const filteredGirls = data.filter((girl: Girl) => girl.categories.includes(categoryName as GirlCategory));
        allGirls = filteredGirls; // Assuming you want to set this.allGirls to the filtered list
      }
    });
  }

  async initiateEverythingGirlPage(girlId: number | string): Promise<any> {
    try {
      await this.getAllCities();
      const girl: Girl | undefined = await this.getGirlById(girlId);
      if (girl !== undefined) {
        const girlCity = girl.city;
        this.internalService.updateGirlData([girl]);
        this.internalService.updateActiveCity(girlCity);
      }
      await this.getAllSpecificLocations();
      await this.getAllServices();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getAllPricingPlans(): Promise<any> {
    try {
      const response = await this.http.get(`${this.baseUrl}/girl-api/pricingPlan`).toPromise();
      return response;
    } catch (error) {
      console.error(`Error while fetching pricing plan data`, error);
      return error;
    }
  }

  async sendAnounceRequest(name: string, email: string, phone: string, message: string, paymentTier: string = ''): Promise<any> {
    try {
      const payload = { name, email, phoneNumber: phone, paymentTier, message };
      const response = await this.http.put(`${this.baseUrl}/girl-api/anounceRequest`, payload).toPromise();
      return response;
    } catch (error) {
      console.error(`Error while sending an anounce request`, error);
      return error;
    }
  }

  // Blogs Logic
  async getBlogById(blogId: number | string): Promise<any> {
    try {
      const response = await this.http.get(`${this.baseUrl}/girl-api/blogs/${blogId}`).toPromise();
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getAllBlogs(): Promise<any> {
    try {
      const response = await this.http.get(`${this.baseUrl}/girl-api/blogs`).toPromise();
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
