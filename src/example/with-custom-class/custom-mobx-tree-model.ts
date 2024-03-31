import { makeAutoObservable, runInAction } from 'mobx';
import { MobxTreeModel } from '@pulexui/core';

export class CustomMobxTreeModel<ID_TYPE = number> implements MobxTreeModel<ID_TYPE> {
  id: ID_TYPE;
  name: string;
  children?: CustomMobxTreeModel<ID_TYPE>[] | undefined;
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
  static create<ID_TYPE = number>(params: CustomMobxTreeModel<ID_TYPE>) {
    const node = new CustomMobxTreeModel<ID_TYPE>();

    runInAction(() => {
      Object.assign(node, params);
    });

    return node;
  }
}
