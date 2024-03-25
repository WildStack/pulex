import { IObservableArray, observable } from 'mobx';
import { CustomFluxionTreeModel, CustomFluxionTreeModelFactory } from './customfluxion-tree-model';

export const initialData = (): IObservableArray<CustomFluxionTreeModel> => {
  const arr = [
    CustomFluxionTreeModelFactory.create({
      id: '100',
      name: 'Unread',
      isSelected: false,
      isExpanded: false,
      isFile: false,
      children: [
        CustomFluxionTreeModelFactory.create({
          id: 'mmmxxxxx',
          name: 'Alice MMMM',
          isSelected: false,
          isExpanded: false,
          isFile: false,
          children: [
            CustomFluxionTreeModelFactory.create({
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
    CustomFluxionTreeModelFactory.create({
      id: '2',
      name: 'Threads',
      isSelected: false,
      isExpanded: false,
      isFile: true,
    }),
    CustomFluxionTreeModelFactory.create({
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
            CustomFluxionTreeModelFactory.create({
              id: 'd1',
              name: 'Alice',
              isSelected: false,
              isExpanded: false,
              isFile: true,
            }),
            CustomFluxionTreeModelFactory.create({
              id: 'd2',
              name: 'Bob',
              isSelected: false,
              isExpanded: false,
              isFile: true,
            }),
            CustomFluxionTreeModelFactory.create({
              id: 'd3',
              name: 'Charlie',
              isSelected: false,
              isExpanded: false,
              isFile: true,
            }),
          ],
        },
        CustomFluxionTreeModelFactory.create({
          id: 'c2',
          name: 'Random',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        CustomFluxionTreeModelFactory.create({
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
    CustomFluxionTreeModelFactory.create({
      id: '4',
      name: 'Direct Messages',
      children: [
        CustomFluxionTreeModelFactory.create({
          id: 'd1',
          name: 'Alice',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        CustomFluxionTreeModelFactory.create({
          id: 'd2',
          name: 'Bob',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        CustomFluxionTreeModelFactory.create({
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

export const testData = (): IObservableArray<CustomFluxionTreeModel> => {
  const arr = [
    CustomFluxionTreeModelFactory.create({
      id: '40',
      name: 'XX',
      isFile: false,
      children: [
        CustomFluxionTreeModelFactory.create({
          id: 'x1',
          name: 'Alice',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        CustomFluxionTreeModelFactory.create({
          id: 'x2',
          name: 'Bob',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        CustomFluxionTreeModelFactory.create({
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
    CustomFluxionTreeModelFactory.create({
      id: '50',
      name: 'MM',
      isFile: false,
      children: [
        CustomFluxionTreeModelFactory.create({
          id: 'm1',
          name: 'Alice',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        CustomFluxionTreeModelFactory.create({
          id: 'm2',
          name: 'Bob',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        CustomFluxionTreeModelFactory.create({
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
