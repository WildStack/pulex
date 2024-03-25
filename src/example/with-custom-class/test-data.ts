import { IObservableArray, observable } from 'mobx';
import { CustomMobxTreeModel, CustomMobxTreeModelFactory } from './custom-mobx-tree-model';

export const initialData = (): IObservableArray<CustomMobxTreeModel> => {
  const arr = [
    CustomMobxTreeModelFactory.create({
      id: '100',
      name: 'Unread',
      isSelected: false,
      isExpanded: false,
      isFile: false,
      children: [
        CustomMobxTreeModelFactory.create({
          id: 'mmmxxxxx',
          name: 'Alice MMMM',
          isSelected: false,
          isExpanded: false,
          isFile: false,
          children: [
            CustomMobxTreeModelFactory.create({
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
    CustomMobxTreeModelFactory.create({
      id: '2',
      name: 'Threads',
      isSelected: false,
      isExpanded: false,
      isFile: true,
    }),
    CustomMobxTreeModelFactory.create({
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
            CustomMobxTreeModelFactory.create({
              id: 'd1',
              name: 'Alice',
              isSelected: false,
              isExpanded: false,
              isFile: true,
            }),
            CustomMobxTreeModelFactory.create({
              id: 'd2',
              name: 'Bob',
              isSelected: false,
              isExpanded: false,
              isFile: true,
            }),
            CustomMobxTreeModelFactory.create({
              id: 'd3',
              name: 'Charlie',
              isSelected: false,
              isExpanded: false,
              isFile: true,
            }),
          ],
        },
        CustomMobxTreeModelFactory.create({
          id: 'c2',
          name: 'Random',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        CustomMobxTreeModelFactory.create({
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
    CustomMobxTreeModelFactory.create({
      id: '4',
      name: 'Direct Messages',
      children: [
        CustomMobxTreeModelFactory.create({
          id: 'd1',
          name: 'Alice',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        CustomMobxTreeModelFactory.create({
          id: 'd2',
          name: 'Bob',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        CustomMobxTreeModelFactory.create({
          id: 'd3',
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
      id: '40',
      name: 'XX',
      isFile: false,
      children: [
        CustomMobxTreeModelFactory.create({
          id: 'x1',
          name: 'Alice',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        CustomMobxTreeModelFactory.create({
          id: 'x2',
          name: 'Bob',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        CustomMobxTreeModelFactory.create({
          id: 'x3',
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
      id: '50',
      name: 'MM',
      isFile: false,
      children: [
        CustomMobxTreeModelFactory.create({
          id: 'm1',
          name: 'Alice',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        CustomMobxTreeModelFactory.create({
          id: 'm2',
          name: 'Bob',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        CustomMobxTreeModelFactory.create({
          id: 'm3',
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
