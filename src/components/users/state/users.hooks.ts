import { useEffect, useState } from 'react';
import { User, usersService, usersQuery } from '../state';
import { Observable, Subscription } from 'rxjs';
import { VISIBILITY_FILTER } from '../../users/state';
import { ID } from '@datorama/akita';

interface UserState {
  users: User[];
  active: User | null;
  filter: VISIBILITY_FILTER;
  searchFilters: Partial<User> | null;
}

interface UserActionsState {
  setActive: Function;
  updateFilter: Function;
  applyFilter: Function;
  saveUser: Function;
  deleteUser: Function;
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
export function useUsersFacade(): [UserState, UserActionsState] {
  const [state, setState] = useState<UserState>({
    users: [],
    active: null,
    filter: VISIBILITY_FILTER.SHOW_ALL,
    searchFilters: null,
  });

  /**
   * Manage subscriptions with auto-cleanup
   */
  useEffect(() => {
    const subscriptions: Subscription[] = [
      onEmit<User[]>(usersQuery.selectVisibleUsers$, (users) => {
        setState((state) => {
          return { ...state, users };
        });
      }),
      onEmit<User[] | User | undefined>(
        usersQuery.selectActive$,
        (active: any) => {
          setState((state) => ({ ...state, active }));
        }
      ),
      onEmit<VISIBILITY_FILTER>(
        usersQuery.selectVisibilityFilter$,
        (filter: any) => {
          setState((state) => {
            return { ...state, filter };
          });
        }
      ),
      onEmit<Partial<User>>(
        usersQuery.selectSearchFilter$,
        (searchFilters: any) => {
          setState((state) => {
            return { ...state, searchFilters };
          });
        }
      ),
    ];

    usersService.loadAll();

    return () => {
      subscriptions.map((it) => it.unsubscribe());
    };
  }, []);

  const actions = {
    setActive: (id: ID) => usersService.setActive(id),
    updateFilter: (filter: VISIBILITY_FILTER) => {
      usersService.updateFilter(filter);
    },
    applyFilter: (filters: Partial<User>) => {
      usersService.applyFilter(filters);
    },
    saveUser: (role: User) => usersService.addOrUpdate(role),
    deleteUser: ({ id }: User) => usersService.delete(id),
    toggleActive: ({ id }: User) => usersService.toggleActive(id),
  };

  return [state, actions];
}
