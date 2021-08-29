export interface User {
  id: number;
  firstName: String;
  lastName: String;
  role : 'host' | 'client';
  email: String;
  contactNumber: string,
  paymentDetails?: string;
  passwordHash: String;
  dateOfBirth: Date;
}