import { QueryEntity } from '@datorama/akita';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { Role } from './role.model';
import { RolesState, rolesStore, RolesStore } from './roles.store';
import { VISIBILITY_FILTER } from '../../users/state';
import * as utils from '../../common/state/utils';

export class RolesQuery extends QueryEntity<RolesState, Role> {
  // Util for Superadmin Role
  selectVisibilityFilter$ = this.select((state) => state.ui.filter);
  // Util for every user
  selectSearchFilter$ = this.select((state) => state.ui.fields);

  selectVisibleRoles$ = combineLatest([
    this.selectVisibilityFilter$,
    this.selectSearchFilter$,
    // this.selectAll({
    //   //filterBy: [(entity) => entity.name.toLowerCase().includes('uest')],
    //   filterBy: this.getSearchFilterFunctions(),
    // }),
    this.selectAll(),
  ]).pipe(
    map(([filter, searchFilters, roles]) =>
      this.getVisibleRoles(
        filter,
        this.filterBySearchFields(roles, searchFilters)
      )
    )
  );

  selectActive$ = this.selectActive();

  constructor(protected rolesStore: RolesStore) {
    super(rolesStore);
  }

  private filterBySearchFields(
    roles: Role[],
    searchFilters: Partial<Role>
  ): Role[] {
    return roles.filter((role) =>
      utils.filterMap(
        role,
        utils.getFilterFunctionsBySearchFilters(searchFilters, {
          stringFields: this.getStringFields(),
        })
      )
    );
  }

  private getVisibleRoles(filter: string, roles: Role[]): Role[] {
    switch (filter) {
      case VISIBILITY_FILTER.SHOW_ACTIVE:
        return roles.filter((r) => r.active);
      default:
        return roles;
    }
  }

  private getStringFields(): string[] {
    return ['name', 'description'];
  }
}

export const rolesQuery = new RolesQuery(rolesStore);
