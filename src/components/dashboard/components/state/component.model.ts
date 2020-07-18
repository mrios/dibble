import { ID } from '@datorama/akita';

export interface Component {
  id: ID;
}

export function createComponent(params: Partial<Component>) {
  return {

  } as Component;
}
