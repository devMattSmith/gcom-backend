export interface Verification {
  token: String;
  expireTime: Date;
  isVerified: Boolean;
}
export interface User {
  _id?: string;
  email: string;
  password: string;
  name: String;
  verification: Verification;
  lastName: String;
  firstName: String;
  city: String;
  state: String;
  registerType: String;
  country: String;
  isDesable: Boolean;
  phoneNumber: Number;
  zipcode: Number;
  thumbnail: String;
  description: String;
  intrest: String;
  status: Boolean;
  registrationDate: String;
  role: String;
  dt_added: Date;
  dt_upd: Date;
}
export interface UserList {
  data: [User];
}
