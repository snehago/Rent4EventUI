export interface User {
  id: number;
  firstName: String;
  lastName: String;
  role : 'host' | 'client' | 'admin';
  email: String;
  contactNumber: string,
  paymentDetails?: string;
  passwordHash: String;
  dateOfBirth: Date;
}