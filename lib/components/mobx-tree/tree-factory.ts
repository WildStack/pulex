import { runInAction } from 'mobx';
import { MobxTreeModel } from './tree.model';

export class MobxTreeModelFactory {
  static create(params: Omit<MobxTreeModel, 'isDisabled' | 'hasCaret'>) {
    const node = new MobxTreeModel();

    runInAction(() => {
      Object.assign(node, params);
    });

    node.isDisabled = false;
    node.hasCaret = !params.isFile;

    return node;
  }
}
