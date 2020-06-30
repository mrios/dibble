import { Query } from '@datorama/akita';
import {
  DashboardStore,
  DashboardState,
  dashboardStore,
} from './dashboard.store';

export class DashboardQuery extends Query<DashboardState> {
  constructor(protected store: DashboardStore) {
    super(store);
  }
}

export const dashboardQuery = new DashboardQuery(dashboardStore);
