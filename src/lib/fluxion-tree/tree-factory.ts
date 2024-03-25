import { runInAction } from 'mobx';
import { FluxionTreeModel } from './tree.model';

export class FluxionTreeModelFactory {
  static create(params: FluxionTreeModel) {
    const node = new FluxionTreeModel();

    runInAction(() => {
      Object.assign(node, params);
    });

    return node;
  }
}
