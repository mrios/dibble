import { useEffect, useState } from 'react';
import { componentService, componentQuery } from '../state';
import { Observable, Subscription } from 'rxjs';
import { ComponentState } from './component.store';

interface ComponentActionsState {}

function onEmit<T>(
  source$: Observable<T>,
  nextFn: (value: T) => void
): Subscription {
  return source$.subscribe(nextFn, console.error);
}

/**
 * View Model for view components
 */
export function useComponentFacade(): [ComponentState, ComponentActionsState] {
  const [stateComponent, setState] = useState<ComponentState>({});

  /**
   * Manage subscriptions with auto-cleanup
   */
  useEffect(() => {
    const subscriptions: Subscription[] = [
      onEmit<{}>(componentQuery.select('groups'), (data) => {
        setState((stateComponent: any) => {
          return { ...stateComponent, groups: data };
        });
      }),
    ];

    componentService.loadAll();

    return () => {
      subscriptions.map((it) => it.unsubscribe());
    };
  }, []);

  const actions = {};

  return [stateComponent, actions];
}
