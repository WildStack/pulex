import { observer } from 'mobx-react-lite';
import { FluxionTreeNode } from './tree-node';
import { FluxionTreeProps } from './tree.type';
import { FluxionTreeModel } from '.';

export const FluxionTree = observer(
  <T extends FluxionTreeModel>({
    nodes,
    onToggle,
    onClick,
    onCollapse,
    onExpand,
    onContextMenu,
    compact,
    className,
  }: FluxionTreeProps<T>): JSX.Element => {
    return (
      <>
        <div className={className ? className + ' fluxion-tree' : 'fluxion-tree'}>
          {nodes.map(node => (
            <FluxionTreeNode<T>
              compact={compact}
              localDepth={0}
              key={node.id}
              node={node}
              onToggle={onToggle}
              onClick={onClick}
              onCollapse={onCollapse}
              onExpand={onExpand}
              onContextMenu={onContextMenu}
            />
          ))}
        </div>
      </>
    );
  }
);
