import { FluxionTreeModel } from './tree.model';

export interface FluxionTreeProps<T extends FluxionTreeModel> {
  className?: string;
  nodes: T[];
  compact?: boolean;
  onClick?: (node: T) => void;
  onToggle?: (node: T, value: boolean) => void;
  onExpand?: (node: T) => void;
  onCollapse?: (node: T) => void;
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, node: T) => void;
}

export interface FluxionTreeNodeProps<T extends FluxionTreeModel> {
  node: T;
  compact?: boolean;
  onClick?: (node: T) => void;
  onToggle?: (node: T, value: boolean) => void;
  onExpand?: (node: T) => void;
  onCollapse?: (node: T) => void;
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, node: T) => void;
  localDepth: Readonly<number>; // only for tree node
}
