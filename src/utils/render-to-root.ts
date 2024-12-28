import { ReactNode } from 'react';
import mitt from 'mitt';

export type RenderToRoot = (destroy: () => void) => ReactNode;

export const rootHostEmitter = mitt<{
  render: RenderToRoot;
}>();

export function renderToRoot(render: (destroy: () => void) => ReactNode) {
  rootHostEmitter.emit('render', render);
}
