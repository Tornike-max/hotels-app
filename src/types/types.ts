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
// export interface EditProfileTypes {
//   phone?: string;
//   email?: string;
//   location?: string;
//   password: string;
// }
