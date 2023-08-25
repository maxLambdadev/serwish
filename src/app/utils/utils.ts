import { Params } from "@angular/router";
import { ServiceFilterArgs, SpecialistFilterArgs } from "@models/index";

export function scrollDistance(callback: any, refresh: number = 66) {

  // Make sure a valid callback was provided
  if (!callback || typeof callback !== 'function') return;

  // Variables
  let isScrolling: any, start: number, end: number, distance: number;

  // Listen for scroll events
  window.addEventListener('scroll', (_event: any) => {

    let scrollFromTop = window.pageYOffset;

    // Set starting position
    if (!start) {
      start = window.pageYOffset;
    }

    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling);

    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(() => {

      // Calculate distance
      end = window.pageYOffset;
      distance = end - start;

      // Run the callback
      callback(distance, scrollFromTop, start, end);

      // Reset calculations
      start = null;
      end = null;
      distance = null;

    }, refresh);

  }, { passive: true });

}

export function generateServiceArgs(queryParams: Params): ServiceFilterArgs {

  const categories = queryParams?.categories
    ? JSON.parse(queryParams?.categories)
    : [];

  console.log("categories", categories);

  let cities: any = queryParams.cities;
  let selectedCities: Array<number> = [];

  if (cities) {
    //Check this
    if (cities instanceof Array) {
      selectedCities = cities.map((value: any) => {
        return parseInt(value);
      });
    } else {
      selectedCities.push(parseInt(cities));
    }
  }

  const args: ServiceFilterArgs = {
    locale: queryParams?.locale || 'ka',
    page: 1,
    perPage: 16,
    categories: categories,
    has_serwish_quality: queryParams?.quality ? true : null,
    personal: queryParams?.personal ? queryParams?.personal : null,
    cities: selectedCities.length > 0 ? selectedCities : []
  };

  console.log("args in util", args);

  return args;
}

export function generateSpecialistsArgs(queryParams: Params): SpecialistFilterArgs {

  let categories: any = queryParams?.categories;
  let cities: any = queryParams?.cities;

  let selectedCategories: Array<number> = [];
  let selectedCities: Array<number> = [];

  if (categories) {
    if (categories instanceof Array) {
      selectedCategories = categories.map((value: any) => {
        return parseInt(value);
      });
    } else {
      selectedCategories.push(parseInt(categories));
    }
  }

  if (cities) {
    //Check this
    if (cities instanceof Array) {
      selectedCities = cities.map((value: any) => {
        return parseInt(value);
      });
    } else {
      selectedCities.push(parseInt(cities));
    }
  }

  const args: SpecialistFilterArgs = {
    locale: queryParams.locale || 'ka',
    page: 1,
    perPage: 18,
    has_serwish_quality: queryParams?.quality ? true : null,
    personal: queryParams?.personal ? queryParams?.personal : null,
    categories: selectedCategories.length > 0 ? selectedCategories : [],
    cities: selectedCities.length > 0 ? selectedCities : []
  };

  return args;
}

export function futureDateCreator(): Date {
  let targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 10);

  const dd = targetDate.getDate();
  const mm = targetDate.getMonth() + 1;
  const yyyy = targetDate.getFullYear() + 5;

  let futureDate = new Date(yyyy, mm, dd);

  return futureDate;
}

export function formatDate(date: any) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}

//Return false array of i size
export function counter(i: number): Array<number> {
  return new Array(i);
}