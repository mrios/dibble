import { useEffect, useState } from 'react';
import { Role, rolesService, rolesQuery } from '../state';
import { Observable, Subscription } from 'rxjs';
import { VISIBILITY_FILTER } from '../../users/state';
import { ID } from '@datorama/akita';

interface RoleState {
  roles: Role[];
  active: Role | null;
  filter: VISIBILITY_FILTER;
  searchFilters: Partial<Role> | null;
}

interface RoleActionsState {
  setActive: Function;
  updateFilter: Function;
  applyFilter: Function;
  saveRole: Function;
  deleteRole: Function;
  toggleActive: Function;
}

function onEmit<T>(
  source$: Observable<T>,
  nextFn: (value: T) => void
): Subscription {
  return source$.subscribe(nextFn, console.error);
}

/**
 * View Model for view components
 */
export function useRolesFacade(): [RoleState, RoleActionsState] {
  const [state, setState] = useState<RoleState>({
    roles: [],
    active: null,
    filter: VISIBILITY_FILTER.SHOW_ALL,
    searchFilters: null,
  });

  /**
   * Manage subscriptions with auto-cleanup
   */
  useEffect(() => {
    const subscriptions: Subscription[] = [
      onEmit<Role[]>(rolesQuery.selectVisibleRoles$, (roles) => {
        setState((state) => {
          return { ...state, roles };
        });
      }),
      onEmit<Role[] | Role | undefined>(
        rolesQuery.selectActive$,
        (active: any) => {
          setState((state) => ({ ...state, active }));
        }
      ),
      onEmit<VISIBILITY_FILTER>(
        rolesQuery.selectVisibilityFilter$,
        (filter: any) => {
          setState((state) => {
            return { ...state, filter };
          });
        }
      ),
      onEmit<Partial<Role>>(
        rolesQuery.selectSearchFilter$,
        (searchFilters: any) => {
          setState((state) => {
            return { ...state, searchFilters };
          });
        }
      ),
    ];

    rolesService.loadAll();

    return () => {
      subscriptions.map((it) => it.unsubscribe());
    };
  }, []);

  const actions = {
    setActive: (id: ID) => rolesService.setActive(id),
    updateFilter: (filter: VISIBILITY_FILTER) => {
      rolesService.updateFilter(filter);
    },
    applyFilter: (filters: Partial<Role>) => {
      rolesService.applyFilter(filters);
    },
    saveRole: (role: Role) => rolesService.addOrUpdate(role),
    deleteRole: ({ id }: Role) => rolesService.delete(id),
    toggleActive: ({ id }: Role) => rolesService.toggleActive(id),
  };

  return [state, actions];
}
