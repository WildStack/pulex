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
    console.log(node);

    store.updateName(node, newName);
  };

  const simulateChildrenLoading = async () => {
    await runInAction(async () => {
      const node = store.state[0]; // first node

      console.log('before', toJS(node));

      node.setCustomActiveIcon('loading');
      node.setDisabled(true);

      await new Promise(f => setTimeout(f, 1000));

      node.setCustomActiveIcon('folder');
      node.setDisabled(false);
      store.updateToggle(node, true);

      runInAction(() => {
        node.children?.push(...testData());
      });

      console.log('after', toJS(node));
    });
  };

  return (
    <>
      <button onClick={clearConsole}>Clear Console</button>
      <button onClick={clearState}>Clear State</button>
      <button onClick={logState}>Log State</button>
      <button onClick={logStateJson}>Log State (JSON)</button>
      <button onClick={restartState}>Restart State</button>
      <br />
      <br />
      <button onClick={() => deleteNode(7576)}>Delete ID 7576</button>
      <button onClick={() => deleteNode(6799)}>Delete ID 6799</button>
      <button onClick={() => deleteNode(1440)}>Delete ID 1440</button>
      <br />
      <br />
      <button onClick={addTestData}>Add Test Data</button>
      <button onClick={addTestDataDeep}>Add Test Data (Deep First Node)</button>
      <br />
      <br />
      <button onClick={() => expandNode(store.state[0])}>Expand First Node</button>
      <button onClick={() => expandNode(store.state[0].children![0])}>Expand deep Node</button>
      <button onClick={expandAll}>Expand All</button>
      <button onClick={collapseAll}>Collapse All</button>
      <br />
      <br />
      <button onClick={() => updateName(store.state[0], 'Nigeria')}>Update Name</button>
      <br />
      <br />
      <button onClick={() => simulateChildrenLoading()}>
        Simulate children loading for first element
      </button>

      <br />
      <br />

      <div
        style={{
          height: 300,
          width: 500,
          maxHeight: 300,
          border: '1px solid white',
          overflowX: 'hidden',
          resize: 'both',
        }}
      >
        <MobxTree<number, CustomMobxTreeModel>
          compact={false}
          nodes={store.state}
          onToggle={async ({ node, value }) => {
            store.updateToggle(node, value);
          }}
          onClick={({ node }) => {
            console.log(toJS(node));
            console.log('customActiveIcon', toJS(node.customActiveIcon));

            // 1. It is better to select node first for animation speed
            store.updateIsSelected(node);

            // 2. And then recusrively deselect others except the selected node
            store.recusive(store.state, n => {
              if (n.id !== node.id) {
                n.isSelected = false;
              }
            });
          }}
          renderTypeIcon={node => {
            if (node?.customActiveIcon === 'loading') {
              return <>Loading</>;
            }
            if (node.isFile) {
              return <>FILE</>;
            }

            return <>FOLDER</>;
          }}
          onContextMenu={({ node, e }) => {
            console.log(toJS(node));
            e.preventDefault();
            console.log('Right Click', e.pageX, e.pageY, toJS(node));
          }}
          renderArrowIcon={node => (node.isExpanded ? <span>&#8595;</span> : <span>&#8594;</span>)}
        />
      </div>
    </>
  );
};
