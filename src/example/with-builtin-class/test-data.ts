import { IObservableArray, observable } from 'mobx';
import { MobxTreeModel, MobxTreeModelFactory } from '@pulexui/core';

export const initialData = (): IObservableArray<MobxTreeModel> => {
  const arr = [
    MobxTreeModelFactory.create({
      id: '100',
      name: 'Unread',
      isSelected: false,
      isExpanded: false,
      isFile: false,
      children: [
        MobxTreeModelFactory.create({
          id: 'mmmxxxxx',
          name: 'Alice MMMMAlice MMMMAlice MMMMAlice MMMM',
          isSelected: false,
          isExpanded: false,
          isFile: false,
          children: [
            MobxTreeModelFactory.create({
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
    MobxTreeModelFactory.create({
      id: '2',
      name: 'ThreadsThreadsThreadsThreadsThreadsThreadsThreads',
      isSelected: false,
      isExpanded: false,
      isFile: true,
    }),
    MobxTreeModelFactory.create({
      id: '3',
      name: 'Chat Rooms',
      isFile: false,
      children: [
        MobxTreeModelFactory.create({
          id: 'c1',
          name: 'General',
          isSelected: false,
          isExpanded: false,
          isFile: false,
          children: [
            MobxTreeModelFactory.create({
              id: 'd1',
              name: 'Alice',
              isSelected: false,
              isExpanded: false,
              isFile: true,
            }),
            MobxTreeModelFactory.create({
              id: 'd2',
              name: 'Bob',
              isSelected: false,
              isExpanded: false,
              isFile: true,
            }),
            MobxTreeModelFactory.create({
              id: 'd3',
              name: 'Charlie',
              isSelected: false,
              isExpanded: false,
              isFile: true,
            }),
          ],
        }),
        MobxTreeModelFactory.create({
          id: 'c2',
          name: 'Random',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        MobxTreeModelFactory.create({
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
    MobxTreeModelFactory.create({
      id: '4',
      name: 'Direct Messages',
      children: [
        MobxTreeModelFactory.create({
          id: 'd1',
          name: 'Alice',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        MobxTreeModelFactory.create({
          id: 'd2',
          name: 'Bob',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        MobxTreeModelFactory.create({
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

export const testData = (): IObservableArray<MobxTreeModel> => {
  const arr = [
    MobxTreeModelFactory.create({
      id: '40',
      name: 'XX',
      isFile: false,
      children: [
        MobxTreeModelFactory.create({
          id: 'x1',
          name: 'Alice',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        MobxTreeModelFactory.create({
          id: 'x2',
          name: 'Bob',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        MobxTreeModelFactory.create({
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
    MobxTreeModelFactory.create({
      id: '50',
      name: 'MM',
      isFile: false,
      children: [
        MobxTreeModelFactory.create({
          id: 'm1',
          name: 'Alice',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        MobxTreeModelFactory.create({
          id: 'm2',
          name: 'Bob',
          isSelected: false,
          isExpanded: false,
          isFile: true,
        }),
        MobxTreeModelFactory.create({
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
