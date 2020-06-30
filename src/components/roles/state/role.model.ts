import { ID, guid } from '@datorama/akita';
import moment, { Moment } from 'moment';

export interface Role {
  id: ID;
  name: string;
  description: string;
  createdAt: Moment;
  // createdBy: User;
  active: boolean;
}

export function createRole(params: Partial<Role>) {
  const newRole: any = {
    ...params,
    id: guid(),
    createdAt: moment(new Date()),
    active: true,
    //createdBy: params.createdBy,
  };
  //this.role = params.role;
  return newRole as Role;
}

export enum VISIBILITY_FILTER {
  SHOW_ACTIVE = 'SHOW_ACTIVE',
  SHOW_ALL = 'SHOW_ALL',
}
