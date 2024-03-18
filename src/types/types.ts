import { Key } from "react";

export interface LoginType {
  email: string;
  password: string;
}

export interface SignupType {
  fullname: string;
  password: string;
  password1: string;
  email: string;
}

export interface CabinType {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  imageUrl: URL;
  hush: string;
}

export type CabinEditType = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
};

export type BookingImagesType = {
  $id: Key;
  cabin: {
    imageUrl: string;
    name: string;
  };
  cabinPrice: number;
};

export type SettingsType = {
  minNights?: number;
  maxNights?: number;
  maxGuests?: number;
  breakfastPrice?: number;
};

export type BookingCreateType = {
  hasBreakfast: boolean;
  isPain: boolean;
  user: string | null;
  status: string;
  extrasPrice: string | number;
  cabinPrice: string | number;
  totalPrice: string | number;
  numGuests: number;
  numNights: number;
  observations: string;
  cabin: string | null;
};

export type CabinCreateType = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  imageUrl: File;
};
