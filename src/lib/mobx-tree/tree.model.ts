import { makeAutoObservable } from 'mobx';

export class MobxTreeModel {
  id: string;
  name: string;
  children?: MobxTreeModel[];
  isSelected: boolean;
  isExpanded: boolean;
  isFile: boolean;

  constructor() {
    makeAutoObservable(this);
  }
}
