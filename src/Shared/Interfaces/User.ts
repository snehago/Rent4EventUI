export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role : 'host' | 'client';
  dateOfBirth: Date;
}