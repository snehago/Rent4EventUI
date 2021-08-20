export interface User {
  id: number;
  firstName: String;
  lastName: String;
  role : 'host' | 'client';
  email: String;
  passwordHash: String;
  dateOfBirth: Date;
}