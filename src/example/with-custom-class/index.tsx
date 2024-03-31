import { runInAction, toJS } from 'mobx';
import { MobxTree } from '@pulexui/core';
import { ExampleCustomMobxTreeState } from './example-mobx-tree-state';
import { initialData, testData } from './test-data';
import { CustomMobxTreeModel } from './custom-mobx-tree-model';

const store = new ExampleCustomMobxTreeState();

export const CustomTreeUsingCustomModel: React.FC = () => {
  const clearConsole = () => {
    console.clear();
  };

  const restartState = () => {
    runInAction(() => store.state.replace(initialData()));
  };

  const clearState = () => {
    runInAction(() => store.state.clear());
  };

  const logState = () => {
    console.log(toJS(store.state));
  };

  const logStateJson = () => {
    console.log(JSON.stringify(toJS(store.state), null, 2));
  };

  const deleteNode = (id: number) => {
    store.delete(id);
  };

  const addTestData = () => {
    runInAction(() => store.state.push(...testData()));
  };

  const addTestDataDeep = () => {
    runInAction(() => {
      store.state[0]?.children?.[0]?.children?.[0]?.children?.push(...testData());
    });
  };

  const expandNode = (node: CustomMobxTreeModel) => {
    store.updateToggle(node, true);
  };

  const expandAll = () => {
    store.recusive(store.state, n => (n.isExpanded = true));
  };

  const collapseAll = () => {
    store.recusive(store.state, n => (n.isExpanded = false));
  };

  const updateName = (node: CustomMobxTreeModel, newName: string) => {
    store.updateName(node, newName);
  };

  return (
    <>
      <button onClick={clearConsole}>Clear Console</button>
      <button onClick={restartState}>Restart State</button>
      <button onClick={clearState}>Clear State</button>
      <button onClick={logState}>Log State</button>
      <button onClick={logStateJson}>Log State (JSON)</button>
      <button onClick={() => deleteNode(7576)}>Delete ID 7576</button>
      <button onClick={() => deleteNode(6799)}>Delete ID 6799</button>
      <button onClick={() => deleteNode(1440)}>Delete ID 1440</button>
      <button onClick={addTestData}>Add Test Data</button>
      <button onClick={addTestDataDeep}>Add Test Data (Deep First Node)</button>
      <button onClick={() => expandNode(store.state[0])}>Expand First Node</button>
      <button onClick={() => expandNode(store.state[0].children![0])}>Expand deep Node</button>
      <button onClick={expandAll}>Expand All</button>
      <button onClick={collapseAll}>Collapse All</button>
      <button onClick={() => updateName(store.state[0], 'Nigeria')}>Update Name</button>

      <br />
      <br />

      <MobxTree<number, CustomMobxTreeModel>
        compact={false}
        nodes={store.state}
        onToggle={(node, value: boolean) => {
          console.log(toJS(node));

          store.updateToggle(node, value);
        }}
        onClick={node => {
          console.log(toJS(node));
          console.log('customSomeData', toJS(node.customSomeData));

          // 1. It is better to select node first for animation speed
          store.updateIsSelected(node);

          // 2. And then recusrively deselect others except the selected node
          store.recusive(store.state, n => {
            if (n.id !== node.id) {
              n.isSelected = false;
            }
          });
        }}
        onContextMenu={(e, node) => {
          console.log(toJS(node));
          e.preventDefault();
          console.log('Right Click', e.pageX, e.pageY, toJS(node));
        }}
      />
    </>
  );
};
