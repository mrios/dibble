import { ID, guid } from '@datorama/akita';
import moment, { Moment } from 'moment';

export interface User {
  id: ID;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  // role: RoleModel;
  createdAt: Moment;
  // createdBy: User;
  active: boolean;
}

export function createUser(params: Partial<User>) {
  const newUser: Partial<User> = {
    ...params,
    id: guid(),
    password: params.password ? params.password : params.username,
    createdAt: moment(new Date()),
    active: true,
    //createdBy: params.createdBy,
  };
  //this.role = params.role;
  return newUser as User;
}

export enum VISIBILITY_FILTER {
  SHOW_ACTIVE = 'SHOW_ACTIVE',
  SHOW_ALL = 'SHOW_ALL',
}
