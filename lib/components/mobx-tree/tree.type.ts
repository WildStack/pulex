import { MobxTreeModel } from './tree.model';

export interface MobxTreeProps<ID_TYPE, T extends MobxTreeModel<ID_TYPE>> {
  nodes: T[];

  className?: string;
  compact?: boolean;

  onClick?: (node: T) => void;
  onToggle?: (node: T, value: boolean) => void;
  onExpand?: (node: T) => void;
  onCollapse?: (node: T) => void;
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, node: T) => void;
  renderTypeIcon?: (node: T) => JSX.Element;
  renderArrowIcon?: (node: T) => JSX.Element;
}

export interface MobxTreeNodeProps<ID_TYPE, T extends MobxTreeModel<ID_TYPE>> {
  node: T;

  compact?: boolean;
  localDepth: Readonly<number>; // only for tree node

  onClick?: (node: T) => void;
  onToggle?: (node: T, value: boolean) => void;
  onExpand?: (node: T) => void;
  onCollapse?: (node: T) => void;
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, node: T) => void;
  renderTypeIcon?: (node: T) => JSX.Element;
  renderArrowIcon?: (node: T) => JSX.Element;
}
