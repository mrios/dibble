import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { User, VISIBILITY_FILTER } from './user.model';

export interface UsersState extends EntityState<User> {
  ui: {
    filter: VISIBILITY_FILTER;
    fields: Partial<User>;
  };
}

const initialState = {
  ui: { filter: VISIBILITY_FILTER.SHOW_ACTIVE, fields: {} },
};

@StoreConfig({
  name: 'users',
})
export class UsersStore extends EntityStore<UsersState> {
  constructor() {
    super(initialState);
  }

  updateFilter(filter: VISIBILITY_FILTER) {
    this.update((state) => {
      return {
        ui: {
          filter: filter,
          fields: state.ui.fields,
        },
      };
    });
  }

  applyFilter(fieldsFilters: any) {
    this.update((state) => {
      return {
        ui: {
          filter: state.ui.filter,
          fields: fieldsFilters,
        },
      };
    });
  }
}

export const usersStore = new UsersStore();
