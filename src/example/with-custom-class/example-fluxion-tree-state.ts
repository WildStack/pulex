import { IObservableArray, makeAutoObservable, toJS } from 'mobx';
import { initialData } from './test-data';
import { CustomFluxionTreeModel } from './customfluxion-tree-model';

export class ExampleCustomFluxionTreeState {
  public state: IObservableArray<CustomFluxionTreeModel> = initialData();

  constructor() {
    makeAutoObservable(this);
  }

  updateName(node: CustomFluxionTreeModel, value: string) {
    node.name = value;
  }
  updateToggle(node: CustomFluxionTreeModel, value: boolean) {
    node.isExpanded = value;
  }
  updateIsSelected(node: CustomFluxionTreeModel) {
    node.isSelected = true;
  }

  private searchParent(
    node: CustomFluxionTreeModel[],
    id: string,
    callback?: (parent: CustomFluxionTreeModel[]) => void
  ): CustomFluxionTreeModel[] | null {
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

  recusive(
    node: CustomFluxionTreeModel[],
    callback?: (node: CustomFluxionTreeModel) => void
  ): void {
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
