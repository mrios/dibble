import { ID } from '@datorama/akita';
import { UsersStore, usersStore } from './users.store';
import { VISIBILITY_FILTER, createUser, User } from './user.model';
import { of } from 'rxjs';

export class UsersService {
  constructor(private usersStore: UsersStore) {}

  async loadAll() {
    const res = await fetch('/api/users');
    const data = await res.json();
    of(data).subscribe((entities) => {
      this.usersStore.set(entities);
    });
  }

  setActive(id: ID) {
    this.usersStore.setActive(id);
  }

  updateActive(user: User) {
    this.usersStore.updateActive(user);
  }

  updateFilter(filter: VISIBILITY_FILTER) {
    this.usersStore.updateFilter(filter);
  }

  applyFilter(filters: Partial<User>) {
    this.usersStore.applyFilter(filters);
  }

  toggleActive(id: ID) {
    this.usersStore.update(id, (entity) => ({ active: !entity.active }));
  }

  add(user: User) {
    const newRole = createUser(user);
    this.usersStore.add(newRole);
  }

  addOrUpdate(user: User) {
    if (!user.id) {
      const newUser = createUser(user);
      this.usersStore.add(newUser);
    } else {
      this.usersStore.upsert(user.id, user);
    }
  }

  delete(id: ID) {
    this.usersStore.remove(id);
  }
}

export const usersService = new UsersService(usersStore);
