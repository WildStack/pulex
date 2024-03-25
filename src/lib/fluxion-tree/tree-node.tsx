import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { AiFillFile, AiFillFolder } from 'react-icons/ai';
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';
import { FluxionTreeNodeProps } from './tree.type';
import { FluxionTreeModel } from '.';

export const FluxionTreeNode = observer(
  <T extends FluxionTreeModel>({
    node,
    onToggle,
    onClick,
    onCollapse,
    onExpand,
    localDepth,
    onContextMenu,
    compact,
  }: FluxionTreeNodeProps<T>) => {
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
      <div className="fluxion-tree-node">
        <div
          className={`fluxion-tree-node-content flex-help ${
            node.isSelected ? 'fluxion-tree-node-content-selected' : ''
          }`}
          style={{ padding: compact ? 0 : 5, paddingLeft: localDepth * 10 }}
          onClick={() => onClick?.(node)}
          onContextMenu={e => onContextMenu?.(e, node)}
        >
          {node.isFile ? (
            <span style={{ width: '20px' }}></span>
          ) : (
            <span className="flex-help" onClick={handleToggle} style={{ cursor: 'pointer' }}>
              {node.isExpanded ? <BiChevronDown size={20} /> : <BiChevronRight size={20} />}
            </span>
          )}

          <span className="flex-help">
            {node.isFile ? (
              <AiFillFile color="#6bc7f6" size={20} />
            ) : (
              <AiFillFolder color="#f6cf60" size={20} />
            )}
          </span>

          <div style={{ flex: 1, paddingLeft: '5px' }}>{node.name}</div>
        </div>

        {node.isExpanded &&
          (node.children?.length ?? 0) > 0 &&
          node?.children?.map(child => (
            <FluxionTreeNode<T>
              compact={compact}
              localDepth={localDepth + 1}
              key={child.id}
              node={child as T}
              onToggle={onToggle}
              onClick={onClick}
              onCollapse={onCollapse}
              onExpand={onExpand}
              onContextMenu={onContextMenu}
            />
          ))}
      </div>
    );
  }
);
