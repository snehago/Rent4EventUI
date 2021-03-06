import { Country, State, City } from "country-state-city";
import { ICountry, IState } from "country-state-city/dist/lib/interface";

class SharedService {
  countries: ICountry[] = Country.getAllCountries();
  BACKEND_URL: string | undefined = process.env.BACKEND_URL;
  HEADER: any = {
    "content-type": "application/json",
  };
  public async getHeader() {
    return this.HEADER;
  }
  public async getFileHeader(fileSize: any) {
    return {
      "content-type": "multipart/form-data",
      "content-length": fileSize,
    };
  }

  public isUserLoggedIn() {
    if (localStorage.getItem("user")) return true;
    return false;
  }

  public getUser(): string {
    let toReturn = localStorage.getItem("user");
    if (!toReturn) return "";
    return toReturn;
  }
  public getAllCountries() {
    return this.countries;
  }
  public getStatesByCountry(country: ICountry) {
    return State.getStatesOfCountry(country.isoCode);
  }
  public getCitiesByState(state: IState) {
    return City.getCitiesOfState(state.countryCode,state.isoCode);
  }
  public getAllCities() {
    return City.getAllCities();
  }
  public getCityByCountryCode(countryCode) {
    return City.getCitiesOfCountry(countryCode);
  }
  public getDifferenceInDays(date1, date2) {
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days+1;
  }
}

export { SharedService };
