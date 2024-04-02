import { observer, useLocalObservable } from 'mobx-react-lite';
import { useCallback } from 'react';
import { MobxTreeNodeProps } from './tree.type';
import { MobxTreeModel } from './tree.model';
import { ChevronDownIcon, ChevronRightIcon, FileIcon, FolderIcon } from './default-icons';
import { getRandomInt } from '../../utils/random';
import { classNames } from '../../utils/misc';

const RenderTypeIcon = observer(
  <ID_TYPE, T extends MobxTreeModel<ID_TYPE>>({
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
  }
);

const RenderArrowIcon = observer(
  <ID_TYPE, T extends MobxTreeModel<ID_TYPE>>({
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
  }
);

export const MobxTreeNode = observer(
  <ID_TYPE extends string | number, T extends MobxTreeModel<ID_TYPE>>({
    node,
    compact,
    localDepth,
    nodeClassName,
    onToggle,
    onClick,
    onCollapse,
    onExpand,
    onContextMenu,
    renderTypeIcon,
    renderArrowIcon,
  }: MobxTreeNodeProps<ID_TYPE, T>) => {
    const renderTracker = useLocalObservable(() => ({
      localRenderKey: getRandomInt(100000, 999999), // 6 digit random int
      setRandomLocalRenderKey() {
        this.localRenderKey = getRandomInt(100000, 999999);
      },
    }));

    const handleToggle = useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        const expandStatus = !node.isExpanded;

        onToggle?.({
          node,
          value: expandStatus,
          e,
          rerender: renderTracker.setRandomLocalRenderKey,
        });

        expandStatus
          ? onExpand?.({ node, e, rerender: renderTracker.setRandomLocalRenderKey })
          : onCollapse?.({ node, e, rerender: renderTracker.setRandomLocalRenderKey });
      },

      // eslint-disable-next-line react-hooks/exhaustive-deps
      [node]
    );

    return (
      <div className="pulexui-mobx-tree-node" key={renderTracker.localRenderKey}>
        <div
          style={{ padding: compact ? 0 : 5, paddingLeft: localDepth * 10, whiteSpace: 'nowrap' }}
          className={classNames(nodeClassName, {
            'flex-help': true,
            'pulexui-mobx-tree-node-content': true,
            'pulexui-mobx-tree-node-content-selected': node.isSelected,
            'pulex-disabled': node.isDisabled,
          })}
          onClick={e => {
            onClick?.({ node, e, rerender: renderTracker.setRandomLocalRenderKey });
          }}
          onContextMenu={e =>
            onContextMenu?.({ node, e, rerender: renderTracker.setRandomLocalRenderKey })
          }
        >
          {node.hasCaret ? (
            <div
              className="flex-help"
              onClick={handleToggle}
              style={{ cursor: 'pointer', width: '20px', justifyContent: 'center' }}
            >
              <RenderArrowIcon node={node} renderArrowIcon={renderArrowIcon} />
            </div>
          ) : (
            <div style={{ marginLeft: '20px' }}></div>
          )}

          <span className="flex-help">
            <RenderTypeIcon node={node} renderTypeIcon={renderTypeIcon} />
          </span>

          <div
            style={{ flex: 1, paddingLeft: '5px', textOverflow: 'ellipsis', overflow: 'hidden' }}
          >
            {node.name}
          </div>
        </div>

        {node.isExpanded &&
          (node.children?.length ?? 0) > 0 &&
          node?.children?.map(child => (
            <MobxTreeNode<ID_TYPE, T>
              nodeClassName={nodeClassName}
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
