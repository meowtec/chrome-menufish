import { Reducer, useEffect, useReducer } from 'react';
import { generateId } from '../../../utils/random';
import { RenderToRoot, rootHostEmitter } from '../../../utils/render-to-root';

interface RenderToRootItem {
  key: string;
  render: RenderToRoot;
}

type RenderToRootAction =
  | {
      type: 'add';
      payload: RenderToRootItem;
    }
  | {
      type: 'remove';
      payload: RenderToRootItem;
    };

const renderToRootsReducer: Reducer<RenderToRootItem[], RenderToRootAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'remove':
      return state.filter((item) => item.key !== action.payload.key);
    default:
      return state;
  }
};

interface RenderRootItemProps {
  data: RenderToRootItem;
  onRemove(action: RenderToRootItem): void;
}

function RenderRootItem({ data, onRemove }: RenderRootItemProps) {
  return <>{data.render(() => onRemove(data))}</>;
}

export default function RootHost() {
  const [renderToRoots, dispatch] = useReducer(renderToRootsReducer, []);

  const handleRemove = (data: RenderToRootItem) => {
    dispatch({
      type: 'remove',
      payload: data,
    });
  };

  const handleAdd = (data: RenderToRootItem) => {
    dispatch({
      type: 'add',
      payload: data,
    });
  };

  useEffect(() => {
    const listener = (render: RenderToRoot) => {
      handleAdd({
        key: generateId(),
        render,
      });
    };

    rootHostEmitter.on('render', listener);

    return () => rootHostEmitter.off('render', listener);
  }, []);

  return (
    <div>
      {renderToRoots.map((item) => (
        <RenderRootItem key={item.key} data={item} onRemove={handleRemove} />
      ))}
    </div>
  );
}
