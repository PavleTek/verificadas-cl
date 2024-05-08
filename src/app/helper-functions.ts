import { environment } from '../environments/environment';
import { TimeBracket, MultimediaObject, Girl, GirlCategory } from './types';

export function getTextFromTimeBracket(timeBracket: TimeBracket | undefined) {
  if (timeBracket !== undefined) {
    if (timeBracket.startTime === '00:00' && timeBracket.endTime === '24:00') {
      return '24h';
    } else {
      return `De: ${timeBracket.startTime}\nHasta: ${timeBracket.endTime}`;
    }
  } else {
    return undefined;
  }
}

export function formatPrice(price: Number) {
  const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return '$ ' + formattedPrice;
}

export function arraysOverlap(array1: any[], array2: any[]) {
  // Convert arrays to Sets for efficient membership checks
  const set1 = new Set(array1);
  const set2 = new Set(array2);

  // Check if any element in array1 is present in array2
  for (const element of set1) {
    if (set2.has(element)) {
      return true; // Found an overlapping element
    }
  }

  // No overlapping element found
  return false;
}

export function formatPhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/\D/g, '');
}

export function getAgeFromBday(bday: Date) {
  var today = new Date();
  var age = today.getFullYear() - bday.getFullYear();
  var monthDiff = today.getMonth() - bday.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < bday.getDate())) {
    age--;
  }

  return age;
}

export function getImageUrlFromImageName(imageName: string): string {
  const baseUrl: string = environment.baseImageUrl;
  if (imageName.startsWith(baseUrl)) {
    return imageName;
  } else {
    const imageUrl: string = baseUrl + '/' + imageName;
    return imageUrl;
  }
}

export function formatGirlImagesToUrls(images: MultimediaObject): MultimediaObject {
  const activeImages: string[] = images.active.map((image) => {
    return getImageUrlFromImageName(image);
  });
  const bluredFaceImages: string[] = images.bluredFace.map((image) => {
    return getImageUrlFromImageName(image);
  });
  return { request: [], active: activeImages, bluredFace: bluredFaceImages };
}

export function cleanPhoneNumberForDisplay(phoneNumber: number | string) {
  const stringPhoneNumber = phoneNumber.toString();
  return '+' + stringPhoneNumber.substring(0, 2) + ' ' + stringPhoneNumber.substring(2);
}

export function formatEconomicGirlNames(girls: Girl[]): Girl[] {
  return girls.map((girl: Girl) => {
    let firstWord = '';
    if (girl.name && girl.name.trim() !== '') {
      firstWord = girl.name.split(' ')[0];
    }
    return {
      ...girl,
      name: firstWord,
    };
  });
}

export function formatName(name: string): string {
  let firstWord = '';
  if (name && name.trim() !== '') {
    firstWord = name.split(' ')[0];
  }
  return firstWord;
}

export function isValidCategory(category: string): category is GirlCategory {
  return Object.values(GirlCategory).includes(category as GirlCategory);
}
