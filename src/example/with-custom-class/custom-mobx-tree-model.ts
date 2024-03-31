import { makeAutoObservable, runInAction } from 'mobx';
import { MobxTreeModel } from '@pulexui/core';

export class CustomMobxTreeModel<ID_TYPE = string> implements MobxTreeModel<ID_TYPE> {
  id: ID_TYPE;
  name: string;
  children?: MobxTreeModel<ID_TYPE>[] | undefined;
  isSelected: boolean;
  isExpanded: boolean;
  isFile: boolean;

  // added custom
  customSomeData?: string = 'hello';

  constructor() {
    makeAutoObservable(this);
  }
}

export class CustomMobxTreeModelFactory {
  static create(params: CustomMobxTreeModel) {
    const node = new CustomMobxTreeModel();

    runInAction(() => {
      Object.assign(node, params);
    });

    return node;
  }
}
