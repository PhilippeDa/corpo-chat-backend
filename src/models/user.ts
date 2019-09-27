import {roles} from './roles'

export interface IUser {
    id: number;
    email: string;
    role: roles;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
  }
  