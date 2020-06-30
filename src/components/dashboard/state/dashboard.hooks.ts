import { useEffect, useState } from 'react';
import { dashboardService, dashboardQuery } from '../state';
import { Observable, Subscription } from 'rxjs';
import { DashboardState } from './dashboard.store';

interface DashboardActionsState {}

function onEmit<T>(
  source$: Observable<T>,
  nextFn: (value: T) => void
): Subscription {
  return source$.subscribe(nextFn, console.error);
}

type useDashboardFacadeProps = {
  id: string;
};

/**
 * View Model for view components
 */
export function useDashboardFacade(
  props: useDashboardFacadeProps
): [DashboardState, DashboardActionsState] {
  const [stateDashboard, setState] = useState<DashboardState>({
    data: null,
  });

  /**
   * Manage subscriptions with auto-cleanup
   */
  useEffect(() => {
    const subscriptions: Subscription[] = [
      onEmit<{}>(dashboardQuery.select('data'), (data) => {
        setState((stateDashboard: any) => {
          return { ...stateDashboard, data: data };
        });
      }),
    ];

    dashboardService.loadById(props.id);

    return () => {
      subscriptions.map((it) => it.unsubscribe());
    };
  }, [props.id]);

  const actions = {};

  return [stateDashboard, actions];
}
