import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Component } from './component.model';

export interface ComponentState extends EntityState<Component> {}

@StoreConfig({
  name: 'component',
})
export class ComponentStore extends EntityStore<ComponentState> {}

export const componentStore = new ComponentStore();
