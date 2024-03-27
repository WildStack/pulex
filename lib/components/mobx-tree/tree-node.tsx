import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { MobxTreeNodeProps } from './tree.type';
import { MobxTreeModel } from './tree.model';
import { ChevronDownIcon, ChevronRightIcon, FileIcon, FolderIcon } from './default-icons';

const RenderTypeIcon = <T extends MobxTreeModel>({
  node,
  renderTypeIcon,
}: {
  node: T;
  renderTypeIcon?: (node: T) => JSX.Element;
}) => {
  if (renderTypeIcon) {
    return renderTypeIcon(node);
  }

  if (node.isFile) {
    return <FileIcon />;
  }

  return <FolderIcon />;
};

const RenderArrowIcon = <T extends MobxTreeModel>({
  node,
  renderArrowIcon,
}: {
  node: T;
  renderArrowIcon?: (node: T) => JSX.Element;
}) => {
  if (renderArrowIcon) {
    return renderArrowIcon(node);
  }

  if (node.isExpanded) {
    return <ChevronDownIcon />;
  }

  return <ChevronRightIcon />;
};

export const MobxTreeNode = observer(
  <T extends MobxTreeModel>({
    node,
    compact,
    localDepth,
    onToggle,
    onClick,
    onCollapse,
    onExpand,
    onContextMenu,
    renderTypeIcon,
    renderArrowIcon,
  }: MobxTreeNodeProps<T>) => {
    const handleToggle = useCallback(
      (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
        const expandStatus = !node.isExpanded;

        onToggle?.(node, expandStatus);

        expandStatus ? onExpand?.(node) : onCollapse?.(node);
      },

      // eslint-disable-next-line react-hooks/exhaustive-deps
      [node]
    );

    return (
      <div className="pulexui-mobx-tree-node">
        <div
          className={`pulexui-mobx-tree-node-content flex-help ${
            node.isSelected ? 'pulexui-mobx-tree-node-content-selected' : ''
          }`}
          style={{ padding: compact ? 0 : 5, paddingLeft: localDepth * 10, whiteSpace: 'nowrap' }}
          onClick={() => onClick?.(node)}
          onContextMenu={e => onContextMenu?.(e, node)}
        >
          {node.isFile ? (
            <span style={{ width: '20px' }}></span>
          ) : (
            <span className="flex-help" onClick={handleToggle} style={{ cursor: 'pointer' }}>
              <RenderArrowIcon node={node} renderArrowIcon={renderArrowIcon} />
            </span>
          )}

          <span className="flex-help">
            <RenderTypeIcon node={node} renderTypeIcon={renderTypeIcon} />
          </span>

          <div style={{ flex: 1, paddingLeft: '5px' }}>{node.name}</div>
        </div>

        {node.isExpanded &&
          (node.children?.length ?? 0) > 0 &&
          node?.children?.map(child => (
            <MobxTreeNode<T>
              compact={compact}
              localDepth={localDepth + 1}
              key={child.id}
              node={child as T}
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
    );
  }
);
