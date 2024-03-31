import { IObservableArray, makeAutoObservable, toJS } from 'mobx';
import { initialData } from './test-data';
import { CustomMobxTreeModel } from './custom-mobx-tree-model';

export class ExampleCustomMobxTreeState {
  public state: IObservableArray<CustomMobxTreeModel> = initialData();

  constructor() {
    makeAutoObservable(this);
  }

  updateName(node: CustomMobxTreeModel, value: string) {
    node.name = value;
  }
  updateToggle(node: CustomMobxTreeModel, value: boolean) {
    node.isExpanded = value;
  }
  updateIsSelected(node: CustomMobxTreeModel) {
    node.isSelected = true;
  }

  private searchParent(
    node: CustomMobxTreeModel[],
    id: number,
    callback?: (parent: CustomMobxTreeModel[]) => void
  ): CustomMobxTreeModel[] | null {
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

  recusive(node: CustomMobxTreeModel[], callback?: (node: CustomMobxTreeModel) => void): void {
    for (let i = 0; i < node.length; i++) {
      callback?.(node[i]);

      if (node[i].children !== undefined) {
        this.recusive(node[i].children!, callback);
      }
    }
  }

  delete(id: number) {
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
