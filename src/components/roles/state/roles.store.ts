import {
  EntityState,
  EntityStore,
  StoreConfig,
  ActiveState,
} from '@datorama/akita';
import { Role, VISIBILITY_FILTER } from './role.model';

export interface RolesState extends EntityState<Role>, ActiveState {
  ui: {
    filter: VISIBILITY_FILTER;
    fields: Partial<Role>;
  };
}

const initialState = {
  ui: { filter: VISIBILITY_FILTER.SHOW_ACTIVE, fields: {} },
};

@StoreConfig({
  name: 'roles',
})
export class RolesStore extends EntityStore<RolesState> {
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

export const rolesStore = new RolesStore();
