import { configure, makeAutoObservable, toJS } from 'mobx';

configure({
  enforceActions: 'always',
  useProxies: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
});

export class Data {
  id: string;
  name: string;
  children?: Data[];
  isSelected: boolean;
  isExpanded: boolean;
  isFile: boolean;

  constructor(params: Data) {
    const { id, name, children, isSelected, isExpanded, isFile } = params;

    this.id = id;
    this.name = name;
    this.children = children;
    this.isSelected = isSelected;
    this.isExpanded = isExpanded;
    this.isFile = isFile;

    makeAutoObservable(this);
  }
}

class Temp {
  public state: Data[] = [
    new Data({
      id: '100',
      name: 'Unread',
      isSelected: false,
      isExpanded: false,
      isFile: false,
      children: [
        new Data({
          id: 'mmm',
          name: 'Alice MMMM',
          isSelected: false,
          isExpanded: false,
          isFile: false,
          children: [
            new Data({
              id: 'zzz',
              name: 'Alice ZZZ',
              isSelected: false,
              isExpanded: false,
              isFile: false,
              children: [],
            }),
          ],
        }),
      ],
    }),
    new Data({ id: '2', name: 'Threads', isSelected: false, isExpanded: false, isFile: true }),
    new Data({
      id: '3',
      name: 'Chat Rooms',
      isFile: false,
      children: [
        {
          id: 'c1',
          name: 'General',
          isSelected: false,
          isExpanded: false,
          isFile: false,
          children: [
            new Data({
              id: 'd1',
              name: 'Alice',
              isSelected: false,
              isExpanded: false,
              isFile: true,
            }),
            new Data({ id: 'd2', name: 'Bob', isSelected: false, isExpanded: false, isFile: true }),
            new Data({
              id: 'd3',
              name: 'Charlie',
              isSelected: false,
              isExpanded: false,
              isFile: true,
            }),
          ],
        },
        new Data({ id: 'c2', name: 'Random', isSelected: false, isExpanded: false, isFile: true }),
        new Data({
          id: 'c3',
          name: 'Open Source Projects',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
      ],
      isSelected: false,
      isExpanded: false,
    }),
    new Data({
      id: '4',
      name: 'Direct Messages',
      children: [
        new Data({ id: 'd1', name: 'Alice', isSelected: false, isExpanded: false, isFile: true }),
        new Data({ id: 'd2', name: 'Bob', isSelected: false, isExpanded: false, isFile: true }),
        new Data({ id: 'd3', name: 'Charlie', isSelected: false, isExpanded: false, isFile: true }),
      ],
      isSelected: false,
      isExpanded: false,
      isFile: false,
    }),
  ];

  constructor() {
    makeAutoObservable(this);
  }

  updateName(node: Data, value: string) {
    node.name = value;
  }
  updateToggle(node: Data, value: boolean) {
    node.isExpanded = value;
  }
  updateIsSelected(node: Data) {
    node.isSelected = true;
  }

  private findAndApplyCallback(node: Data[], id: string, callback: (node: Data[]) => void) {
    for (let i = 0; i < node.length; i++) {
      if (node[i].id === id) {
        callback(node);
        return true; // Node found, exit recursion
      } else if (node[i]?.children !== undefined) {
        if (this.findAndApplyCallback(node[i].children!, id, callback)) {
          return true; // Node found in children, exit recursion
        }
      }
    }
    return false; // Node not found
  }

  private recursiveAllHelper(node: Data, callback: (node: Data) => void): void {
    callback(node); // Call the callback function when the node with the given ID is found

    if (node.children) {
      node.children.forEach(child => {
        this.recursiveAllHelper(child, callback);
      });
    }
  }

  recursiveAll(callback: (node: Data) => void): void {
    for (const item of this.state) {
      this.recursiveAllHelper(item, callback);
    }
  }

  delete(id: string) {
    console.log('='.repeat(20));
    console.log(id);
    console.log(123);

    this.findAndApplyCallback(this.state, id, parent => {
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

export const temp = new Temp();
