import { makeAutoObservable, runInAction } from 'mobx';
import { MobxTreeModel } from '@pulexui/core';

export class CustomMobxTreeModel<ID_TYPE = number> implements MobxTreeModel<ID_TYPE> {
  constructor() {
    makeAutoObservable(this);
  }

  id: ID_TYPE;
  name: string;
  children?: CustomMobxTreeModel<ID_TYPE>[] | undefined;
  isSelected: boolean;
  isExpanded: boolean;
  isFile: boolean;
  hasCaret?: boolean;
  isDisabled: boolean;

  // added custom
  customActiveIcon?: 'file' | 'folder' | 'loading';

  setCustomActiveIcon(value: 'file' | 'folder' | 'loading') {
    this.customActiveIcon = value;
  }

  setDisabled(value: boolean) {
    this.isDisabled = value;
  }
}

export class CustomMobxTreeModelFactory {
  static create<ID_TYPE = number>(
    params: Omit<
      CustomMobxTreeModel<ID_TYPE>,
      'setCustomActiveIcon' | 'isDisabled' | 'hasCaret' | 'setDisabled'
    >
  ) {
    const node = new CustomMobxTreeModel<ID_TYPE>();

    runInAction(() => {
      Object.assign(node, params);
    });

    node.isDisabled = false;
    node.hasCaret = !params.isFile;

    return node;
  }
}
