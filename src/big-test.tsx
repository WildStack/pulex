import { configure, makeAutoObservable, runInAction, toJS } from 'mobx';
import { useRef } from 'react';
import { NodeRendererProps, Tree, TreeApi } from 'react-arborist';
import { AiFillFile, AiFillFolder } from 'react-icons/ai';
import { MdArrowDropDown, MdArrowRight } from 'react-icons/md';

configure({
  enforceActions: 'always',
  useProxies: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
});

type Data = { id: string; name: string; children?: Data[]; isSelected: boolean };

class Temp {
  public state: Data[] = [
    { id: '100', name: 'Unread', isSelected: false },
    { id: '2', name: 'Threads', isSelected: false },
    {
      id: '3',
      name: 'Chat Rooms',
      children: [
        {
          id: 'c1',
          name: 'General',
          isSelected: false,
          children: [
            { id: 'z1', name: 'Alice', isSelected: false },
            { id: 'z2', name: 'Bob', isSelected: false },
            { id: 'z3', name: 'Charlie', isSelected: false },
          ],
        },
        { id: 'c2', name: 'Random', isSelected: false },
        { id: 'c3', name: 'Open Source Projects', isSelected: false },
      ],
      isSelected: false,
    },
    {
      id: '4',
      name: 'Direct Messages',
      children: [
        { id: 'd1', name: 'Alice', isSelected: false },
        { id: 'd2', name: 'Bob', isSelected: false },
        { id: 'd3', name: 'Charlie', isSelected: false },
      ],
      isSelected: false,
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  updateName(node: Data, name: string) {
    node.name = name;
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

const temp = new Temp();

function Node({ node, style, dragHandle }: NodeRendererProps<Data>) {
  return (
    <div
      className="node-container"
      style={{ ...style, backgroundColor: node.data.isSelected ? '#b0b0b090' : 'transparent' }}
      ref={dragHandle}
    >
      <div className="node-content">
        {/* Toggle */}
        {node.isLeaf ? (
          <>
            <span className="arrow"></span>
            <span className="file-folder-icon">
              <AiFillFile color="#6bc7f6" />
            </span>
          </>
        ) : (
          <>
            <span onClick={() => node.isInternal && node.toggle()} className="arrow">
              {node.isOpen ? <MdArrowDropDown /> : <MdArrowRight />}
            </span>
            <span className="file-folder-icon">
              <AiFillFolder color="#f6cf60" />
            </span>
          </>
        )}

        <span className="node-text">
          {node.isEditing ? (
            <input
              type="text"
              defaultValue={node.data.name}
              onFocus={e => e.currentTarget.select()}
              onBlur={() => node.reset()}
              onKeyDown={e => {
                if (e.key === 'Escape') node.reset();
                if (e.key === 'Enter') node.submit(e.currentTarget.value);
              }}
              autoFocus
            />
          ) : (
            <span>{node.data.name}</span>
          )}
        </span>
      </div>
    </div>
  );
}

export const ReactArgonist = () => {
  const treeRef = useRef<TreeApi<Data>>();

  // useEffect(() => {
  //   const tree = treeRef.current;

  //   if (tree) {
  //     console.log('='.repeat(20));
  //     console.log(tree.firstNode);
  //   }
  // }, []);

  return (
    <>
      <button onClick={() => console.log(toJS(temp.state))}>state</button>

      <button
        onClick={() => {
          console.log('='.repeat(20));
          // console.log(toJS(temp.state));
          console.log(treeRef.current?.firstNode);

          treeRef.current?.delete(treeRef.current?.firstNode);
        }}
      >
        snicky click
      </button>
      <Tree
        ref={treeRef}
        data={temp.state}
        openByDefault={false}
        width={600}
        height={300}
        indent={24}
        rowHeight={36}
        overscanCount={1}
        paddingTop={30}
        paddingBottom={10}
        padding={25 /* sets both */}
        onRename={({ name, node }) => {
          temp.updateName(node.data, name);
        }}
        onSelect={nodes => {
          runInAction(() => {
            temp.recursiveAll(node => (node.isSelected = false));

            for (const node of nodes) {
              node.data.isSelected = true;
            }
          });
        }}
        onDelete={({ ids }) => {
          temp.delete(ids[0]);
        }}
        //
        // this can be arranged later
        // onMove={({ dragIds, dragNodes, index, parentId, parentNode }) => {
        //   console.log('onMove', { dragIds, dragNodes, index, parentId, parentNode });
        // }}
      >
        {Node}
      </Tree>
    </>
  );
};
