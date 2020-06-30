import { Store, StoreConfig } from '@datorama/akita';

export interface DashboardState {
  data: any;
}

export function createInitialState(): DashboardState {
  return {
    data: null,
  };
}

@StoreConfig({ name: 'dashboard' })
export class DashboardStore extends Store<DashboardState> {
  constructor() {
    super(createInitialState());
  }
}

export const dashboardStore = new DashboardStore();
