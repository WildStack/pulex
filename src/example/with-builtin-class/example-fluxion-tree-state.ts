import { IObservableArray, makeAutoObservable, toJS } from 'mobx';
import { FluxionTreeModel } from '../../lib/fluxion-tree';
import { initialData } from './test-data';

export class ExampleFluxionTreeState {
  public state: IObservableArray<FluxionTreeModel> = initialData();

  constructor() {
    makeAutoObservable(this);
  }

  updateName(node: FluxionTreeModel, value: string) {
    node.name = value;
  }
  updateToggle(node: FluxionTreeModel, value: boolean) {
    node.isExpanded = value;
  }
  updateIsSelected(node: FluxionTreeModel) {
    node.isSelected = true;
  }

  private searchParent(
    node: FluxionTreeModel[],
    id: string,
    callback?: (parent: FluxionTreeModel[]) => void
  ): FluxionTreeModel[] | null {
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

  recusive(node: FluxionTreeModel[], callback?: (node: FluxionTreeModel) => void): void {
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
