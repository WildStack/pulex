import { makeAutoObservable } from 'mobx';

export class FluxionTreeModel {
  id: string;
  name: string;
  children?: FluxionTreeModel[];
  isSelected: boolean;
  isExpanded: boolean;
  isFile: boolean;

  constructor() {
    makeAutoObservable(this);
  }
}
