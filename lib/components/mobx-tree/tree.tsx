import { observer } from 'mobx-react-lite';
import { MobxTreeNode } from './tree-node';
import { MobxTreeProps } from './tree.type';
import { MobxTreeModel } from './tree.model';

export const MobxTree = observer(
  <ID_TYPE extends string | number, T extends MobxTreeModel<ID_TYPE>>({
    nodes,
    compact,
    className,
    nodeClassName,
    onToggle,
    onClick,
    onCollapse,
    onExpand,
    onContextMenu,
    renderTypeIcon,
    renderArrowIcon,
  }: MobxTreeProps<ID_TYPE, T>): JSX.Element => {
    return (
      <>
        <div className={className ? className + ' pulexui-mobx-tree' : 'pulexui-mobx-tree'}>
          {nodes.map(node => (
            <MobxTreeNode<ID_TYPE, T>
              compact={compact}
              localDepth={0}
              key={node.id}
              node={node}
              nodeClassName={nodeClassName}
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
