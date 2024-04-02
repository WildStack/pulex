import { Combine } from '../../utils/types';
import { MobxTreeModel } from './tree.model';

export type MobxTreeNodeParamExport<T> = {
  node: T;
  e: React.MouseEvent<HTMLDivElement, MouseEvent>;

  /**
   * @description This property can be used if there is some issue with rerender proccess while changing some props
   */
  rerender: () => void;
};

export type MobxTreeProps<ID_TYPE, T extends MobxTreeModel<ID_TYPE>> = {
  nodes: T[];

  className?: string;
  nodeClassName?: string;
  compact?: boolean;

  onClick?: (params: MobxTreeNodeParamExport<T>) => void;
  onToggle?: (params: Combine<MobxTreeNodeParamExport<T>, { value: boolean }>) => void;
  onExpand?: (params: MobxTreeNodeParamExport<T>) => void;
  onCollapse?: (params: MobxTreeNodeParamExport<T>) => void;
  onContextMenu?: (params: MobxTreeNodeParamExport<T>) => void;
  renderTypeIcon?: (node: T) => JSX.Element;
  renderArrowIcon?: (node: T) => JSX.Element;
};

export type MobxTreeNodeProps<ID_TYPE, T extends MobxTreeModel<ID_TYPE>> = {
  node: T;

  compact?: boolean;
  nodeClassName?: string;
  localDepth: Readonly<number>; // only for tree node

  onClick?: (params: MobxTreeNodeParamExport<T>) => void;
  onToggle?: (params: Combine<MobxTreeNodeParamExport<T>, { value: boolean }>) => void;
  onExpand?: (params: MobxTreeNodeParamExport<T>) => void;
  onCollapse?: (params: MobxTreeNodeParamExport<T>) => void;
  onContextMenu?: (params: MobxTreeNodeParamExport<T>) => void;
  renderTypeIcon?: (node: T) => JSX.Element;
  renderArrowIcon?: (node: T) => JSX.Element;
};
