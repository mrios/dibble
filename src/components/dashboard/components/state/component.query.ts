import { QueryEntity } from '@datorama/akita';
import { ComponentStore, ComponentState, componentStore } from './component.store';

export class ComponentQuery extends QueryEntity<ComponentState> {

  constructor(protected store: ComponentStore) {
    super(store);
  }

}

export const componentQuery = new ComponentQuery(componentStore);
