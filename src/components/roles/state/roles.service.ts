import { ID } from '@datorama/akita';
import { RolesStore, rolesStore } from './roles.store';
import { VISIBILITY_FILTER, createRole, Role } from './role.model';
import { of } from 'rxjs';

export class RolesService {
  constructor(private rolesStore: RolesStore) {}

  async loadAll() {
    const res = await fetch('/api/roles');
    const data = await res.json();
    of(data).subscribe((entities) => {
      this.rolesStore.set(entities);
    });
  }

  setActive(id: ID) {
    this.rolesStore.setActive(id);
  }

  updateActive(role: Role) {
    this.rolesStore.updateActive(role);
  }

  updateFilter(filter: VISIBILITY_FILTER) {
    this.rolesStore.updateFilter(filter);
  }

  applyFilter(filters: Partial<Role>) {
    this.rolesStore.applyFilter(filters);
  }

  toggleActive(id: ID) {
    this.rolesStore.update(id, (entity) => ({ active: !entity.active }));
  }

  add(role: Role) {
    const newRole = createRole(role);
    this.rolesStore.add(newRole);
  }

  addOrUpdate(role: Role) {
    if (!role.id) {
      const newRole = createRole(role);
      this.rolesStore.add(newRole);
    } else {
      this.rolesStore.upsert(role.id, role);
    }
  }

  delete(id: ID) {
    this.rolesStore.remove(id);
  }
}

export const rolesService = new RolesService(rolesStore);
