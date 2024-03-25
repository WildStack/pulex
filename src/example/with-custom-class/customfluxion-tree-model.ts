import { makeAutoObservable, runInAction } from 'mobx';
import { FluxionTreeModel } from '../../lib/fluxion-tree';

export class CustomFluxionTreeModel implements FluxionTreeModel {
  id: string;
  name: string;
  children?: FluxionTreeModel[] | undefined;
  isSelected: boolean;
  isExpanded: boolean;
  isFile: boolean;

  // added custom
  customSomeData?: string = 'hello';

  constructor() {
    makeAutoObservable(this);
  }
}

export class CustomFluxionTreeModelFactory {
  static create(params: CustomFluxionTreeModel) {
    const node = new CustomFluxionTreeModel();

    runInAction(() => {
      Object.assign(node, params);
    });

    return node;
  }
}
