import { IObservableArray, observable } from 'mobx';
import { FluxionTreeModel, FluxionTreeModelFactory } from '../../lib/fluxion-tree';

export const initialData = (): IObservableArray<FluxionTreeModel> => {
  const arr = [
    FluxionTreeModelFactory.create({
      id: '100',
      name: 'Unread',
      isSelected: false,
      isExpanded: false,
      isFile: false,
      children: [
        FluxionTreeModelFactory.create({
          id: 'mmmxxxxx',
          name: 'Alice MMMM',
          isSelected: false,
          isExpanded: false,
          isFile: false,
          children: [
            FluxionTreeModelFactory.create({
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
    FluxionTreeModelFactory.create({
      id: '2',
      name: 'Threads',
      isSelected: false,
      isExpanded: false,
      isFile: true,
    }),
    FluxionTreeModelFactory.create({
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
            FluxionTreeModelFactory.create({
              id: 'd1',
              name: 'Alice',
              isSelected: false,
              isExpanded: false,
              isFile: true,
            }),
            FluxionTreeModelFactory.create({
              id: 'd2',
              name: 'Bob',
              isSelected: false,
              isExpanded: false,
              isFile: true,
            }),
            FluxionTreeModelFactory.create({
              id: 'd3',
              name: 'Charlie',
              isSelected: false,
              isExpanded: false,
              isFile: true,
            }),
          ],
        },
        FluxionTreeModelFactory.create({
          id: 'c2',
          name: 'Random',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        FluxionTreeModelFactory.create({
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
    FluxionTreeModelFactory.create({
      id: '4',
      name: 'Direct Messages',
      children: [
        FluxionTreeModelFactory.create({
          id: 'd1',
          name: 'Alice',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        FluxionTreeModelFactory.create({
          id: 'd2',
          name: 'Bob',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        FluxionTreeModelFactory.create({
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

export const testData = (): IObservableArray<FluxionTreeModel> => {
  const arr = [
    FluxionTreeModelFactory.create({
      id: '40',
      name: 'XX',
      isFile: false,
      children: [
        FluxionTreeModelFactory.create({
          id: 'x1',
          name: 'Alice',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        FluxionTreeModelFactory.create({
          id: 'x2',
          name: 'Bob',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        FluxionTreeModelFactory.create({
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
    FluxionTreeModelFactory.create({
      id: '50',
      name: 'MM',
      isFile: false,
      children: [
        FluxionTreeModelFactory.create({
          id: 'm1',
          name: 'Alice',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        FluxionTreeModelFactory.create({
          id: 'm2',
          name: 'Bob',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        FluxionTreeModelFactory.create({
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
