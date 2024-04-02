import { makeAutoObservable } from 'mobx';

export class MobxTreeModel<ID_TYPE = string> {
  id: ID_TYPE;
  name: string;
  children?: MobxTreeModel<ID_TYPE>[];
  hasCaret?: boolean;
  isSelected: boolean;
  isExpanded: boolean;
  isFile: boolean;
  isDisabled: boolean;

  constructor() {
    makeAutoObservable(this);
  }
}
