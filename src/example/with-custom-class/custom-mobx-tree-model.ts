import { makeAutoObservable, runInAction } from 'mobx';
import { MobxTreeModel } from '../../lib/mobx-tree';

export class CustomMobxTreeModel implements MobxTreeModel {
  id: string;
  name: string;
  children?: MobxTreeModel[] | undefined;
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
