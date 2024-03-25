import { IObservableArray, makeAutoObservable, toJS } from 'mobx';
import { MobxTreeModel } from '../../lib/mobx-tree';
import { initialData } from './test-data';

export class ExampleMobxTreeState {
  public state: IObservableArray<MobxTreeModel> = initialData();

  constructor() {
    makeAutoObservable(this);
  }

  updateName(node: MobxTreeModel, value: string) {
    node.name = value;
  }
  updateToggle(node: MobxTreeModel, value: boolean) {
    node.isExpanded = value;
  }
  updateIsSelected(node: MobxTreeModel) {
    node.isSelected = true;
  }

  private searchParent(
    node: MobxTreeModel[],
    id: string,
    callback?: (parent: MobxTreeModel[]) => void
  ): MobxTreeModel[] | null {
    for (let i = 0; i < node.length; i++) {
      if (node[i].id === id) {
        callback?.(node);

        // Node found, exit recursion <- returns children not node itself
        return node;
      }
      //
      else if (node[i]?.children !== undefined) {
        if (this.searchParent(node[i].children!, id, callback)) {
          return node; // Node found in children, exit recursion
        }
      }
    }

    return null; // Node not found
  }

  recusive(node: MobxTreeModel[], callback?: (node: MobxTreeModel) => void): void {
    for (let i = 0; i < node.length; i++) {
      callback?.(node[i]);

      if (node[i].children !== undefined) {
        this.recusive(node[i].children!, callback);
      }
    }
  }

  delete(id: string) {
    this.searchParent(this.state, id, parent => {
      console.log('='.repeat(20) + 'parent');
      console.log(toJS(parent));

      parent.splice(
        parent.findIndex(node => node.id === id),
        1
      );
    });

    console.log('final', toJS(this.state));
  }
}
