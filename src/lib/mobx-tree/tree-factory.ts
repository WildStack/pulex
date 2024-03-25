import { runInAction } from 'mobx';
import { MobxTreeModel } from './tree.model';

export class MobxTreeModelFactory {
  static create(params: MobxTreeModel) {
    const node = new MobxTreeModel();

    runInAction(() => {
      Object.assign(node, params);
    });

    return node;
  }
}
