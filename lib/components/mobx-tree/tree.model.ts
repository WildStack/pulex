import { makeAutoObservable } from 'mobx';

export class MobxTreeModel<ID_TYPE = string> {
  id: ID_TYPE;
  name: string;
  children?: MobxTreeModel<ID_TYPE>[];
  isSelected: boolean;
  isExpanded: boolean;
  isFile: boolean;

  constructor() {
    makeAutoObservable(this);
  }
}
