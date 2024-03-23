import { makeAutoObservable } from 'mobx';
import { useRef, useEffect } from 'react';
import { NodeRendererProps, Tree, TreeApi } from 'react-arborist';
import { AiFillFile, AiFillFolder } from 'react-icons/ai';
import { MdArrowDropDown, MdArrowRight } from 'react-icons/md';

type Data = { id: string; name: string; children?: Data[] };

class Temp {
  public state: Data[] = [
    { id: '1', name: 'Unread' },
    { id: '2', name: 'Threads' },
    {
      id: '3',
      name: 'Chat Rooms',
      children: [
        { id: 'c1', name: 'General' },
        { id: 'c2', name: 'Random' },
        { id: 'c3', name: 'Open Source Projects' },
      ],
    },
    {
      id: '4',
      name: 'Direct Messages',
      children: [
        { id: 'd1', name: 'Alice' },
        { id: 'd2', name: 'Bob' },
        { id: 'd3', name: 'Charlie' },
      ],
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }
}

const temp = new Temp();

function Node({ node, style, dragHandle }: NodeRendererProps<Data>) {
  return (
    <div
      className="node-container"
      style={{ ...style, backgroundColor: node.isSelected ? '#b0b0b090' : 'transparent' }}
      ref={dragHandle}
    >
      <div className="node-content" onClick={() => node.isInternal && node.toggle()}>
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
            <span className="arrow">{node.isOpen ? <MdArrowDropDown /> : <MdArrowRight />}</span>
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

  useEffect(() => {
    const tree = treeRef.current;
    if (tree) {
      console.log('='.repeat(20));
      console.log(tree.firstNode);
    }
  }, []);

  return (
    <Tree
      ref={treeRef}
      initialData={temp.state}
      openByDefault={false}
      width={600}
      height={1000}
      indent={24}
      rowHeight={36}
      overscanCount={1}
      paddingTop={30}
      paddingBottom={10}
      padding={25 /* sets both */}
    >
      {Node}
    </Tree>
  );
};
