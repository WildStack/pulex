import { IObservableArray, observable } from 'mobx';
import { CustomMobxTreeModel, CustomMobxTreeModelFactory } from './custom-mobx-tree-model';

export const initialData = (): IObservableArray<CustomMobxTreeModel> => {
  const arr = [
    CustomMobxTreeModelFactory.create({
      id: 7576,
      name: 'Unread',
      isSelected: false,
      isExpanded: false,
      isFile: false,
      customActiveIcon: 'folder',
      children: [
        CustomMobxTreeModelFactory.create({
          id: 4509,
          name: 'Alice MMMM',
          isSelected: false,
          isExpanded: false,
          isFile: false,
          children: [
            CustomMobxTreeModelFactory.create({
              id: 6935,
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
    CustomMobxTreeModelFactory.create({
      id: 8444,
      name: 'Threads',
      isSelected: false,
      isExpanded: false,
      isFile: true,
    }),
    CustomMobxTreeModelFactory.create({
      id: 8235,
      name: 'Chat Rooms',
      isFile: false,
      children: [
        CustomMobxTreeModelFactory.create({
          id: 1681,
          name: 'General',
          isSelected: false,
          isExpanded: false,
          isFile: false,
          children: [
            CustomMobxTreeModelFactory.create({
              id: 3817,
              name: 'Alice',
              isSelected: false,
              isExpanded: false,
              isFile: true,
            }),
            CustomMobxTreeModelFactory.create({
              id: 9141,
              name: 'Bob',
              isSelected: false,
              isExpanded: false,
              isFile: true,
            }),
            CustomMobxTreeModelFactory.create({
              id: 6799,
              name: 'Charlie',
              isSelected: false,
              isExpanded: false,
              isFile: true,
            }),
          ],
        }),
        CustomMobxTreeModelFactory.create({
          id: 4922,
          name: 'Random',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        CustomMobxTreeModelFactory.create({
          id: 9416,
          name: 'Open Source Projects',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
      ],
      isSelected: false,
      isExpanded: false,
    }),
    CustomMobxTreeModelFactory.create({
      id: 9819,
      name: 'Direct Messages',
      children: [
        CustomMobxTreeModelFactory.create({
          id: 1968,
          name: 'Alice',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        CustomMobxTreeModelFactory.create({
          id: 9330,
          name: 'Bob',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        CustomMobxTreeModelFactory.create({
          id: 2821,
          name: 'Charlie',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
      ],
      isSelected: false,
      isExpanded: false,
      isFile: false,
    }),
  ];

  return observable(arr);
};

export const testData = (): IObservableArray<CustomMobxTreeModel> => {
  const arr = [
    CustomMobxTreeModelFactory.create({
      id: 1440,
      name: 'XX',
      isFile: false,
      children: [
        CustomMobxTreeModelFactory.create({
          id: 7119,
          name: 'Alice',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        CustomMobxTreeModelFactory.create({
          id: 7395,
          name: 'Bob',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        CustomMobxTreeModelFactory.create({
          id: 4928,
          name: 'Charlie',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
      ],
      isSelected: true,
      isExpanded: true,
    }),
    CustomMobxTreeModelFactory.create({
      id: 2535,
      name: 'MM',
      isFile: false,
      children: [
        CustomMobxTreeModelFactory.create({
          id: 1307,
          name: 'Alice',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        CustomMobxTreeModelFactory.create({
          id: 8616,
          name: 'Bob',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        CustomMobxTreeModelFactory.create({
          id: 1415,
          name: 'Charlie',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
      ],
      isSelected: false,
      isExpanded: false,
    }),
  ];

  return observable(arr);
};
