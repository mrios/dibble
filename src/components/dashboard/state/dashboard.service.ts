import { DashboardStore, dashboardStore } from './dashboard.store';
import { of } from 'rxjs';

export class DashboardService {
  constructor(private dashboardStore: DashboardStore) {}
  async loadAll() {
    const res = await fetch('/api/dashboard/collections');
    const data = await res.json();
    of(data).subscribe((data) => {
      this.dashboardStore.update({ data: data });
    });
  }

  async loadById(id: string) {
    const res = await fetch(`/api/dashboard/collections/${id}`);
    const data = await res.json();
    of(data).subscribe((data) => {
      this.dashboardStore.update({ data: data });
    });
  }
}

export const dashboardService = new DashboardService(dashboardStore);
