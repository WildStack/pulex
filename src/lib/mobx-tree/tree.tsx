import { observer } from 'mobx-react-lite';
import { MobxTreeNode } from './tree-node';
import { MobxTreeProps } from './tree.type';
import { MobxTreeModel } from './tree.model';

export const MobxTree = observer(
  <T extends MobxTreeModel>({
    nodes,
    compact,
    className,
    onToggle,
    onClick,
    onCollapse,
    onExpand,
    onContextMenu,
    renderTypeIcon,
    renderArrowIcon,
  }: MobxTreeProps<T>): JSX.Element => {
    return (
      <>
        <div className={className ? className + ' pulex-mobx-tree' : 'pulex-mobx-tree'}>
          {nodes.map(node => (
            <MobxTreeNode<T>
              compact={compact}
              localDepth={0}
              key={node.id}
              node={node}
              onToggle={onToggle}
              onClick={onClick}
              onCollapse={onCollapse}
              onExpand={onExpand}
              onContextMenu={onContextMenu}
              renderTypeIcon={renderTypeIcon}
              renderArrowIcon={renderArrowIcon}
            />
          ))}
        </div>
      </>
    );
  }
);
