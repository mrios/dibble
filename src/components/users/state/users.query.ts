import { QueryEntity } from '@datorama/akita';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user.model';
import { UsersState, usersStore, UsersStore } from './users.store';
import { VISIBILITY_FILTER } from '../../users/state';
import * as utils from '../../common/state/utils';

export class UsersQuery extends QueryEntity<UsersState, User> {
  // Util for Superadmin Role
  selectVisibilityFilter$ = this.select((state) => state.ui.filter);
  // Util for every user
  selectSearchFilter$ = this.select((state) => state.ui.fields);

  selectVisibleUsers$ = combineLatest([
    this.selectVisibilityFilter$,
    this.selectSearchFilter$,
    // this.selectAll({
    //   //filterBy: [(entity) => entity.name.toLowerCase().includes('uest')],
    //   filterBy: this.getSearchFilterFunctions(),
    // }),
    this.selectAll(),
  ]).pipe(
    map(([filter, searchFilters, users]) =>
      this.getVisibleUsers(
        filter,
        this.filterBySearchFields(users, searchFilters)
      )
    )
  );

  selectActive$ = this.selectActive();

  constructor(protected usersStore: UsersStore) {
    super(usersStore);
  }

  private filterBySearchFields(
    users: User[],
    searchFilters: Partial<User>
  ): User[] {
    return users.filter((user) =>
      utils.filterMap(
        user,
        utils.getFilterFunctionsBySearchFilters(searchFilters, {
          stringFields: this.getStringFields(),
        })
      )
    );
  }

  private getVisibleUsers(filter: string, users: User[]): User[] {
    switch (filter) {
      case VISIBILITY_FILTER.SHOW_ACTIVE:
        return users.filter((r) => r.active);
      default:
        return users;
    }
  }

  private getStringFields(): string[] {
    return ['username', 'firstName', 'lastName'];
  }
}

export const usersQuery = new UsersQuery(usersStore);
