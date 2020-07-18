import { ID } from '@datorama/akita';
import { ComponentStore, componentStore } from './component.store';
import { of } from 'rxjs/internal/observable/of';

export class ComponentService {
  constructor(private componentStore: ComponentStore) {}

  async loadAll() {
    const res = await fetch('/api/dashboard/components');
    const data = await res.json();
    of(data).subscribe((data) => {
      this.componentStore.update(data);
    });
  }
}

export const componentService = new ComponentService(componentStore);
