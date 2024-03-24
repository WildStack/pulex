import './tree.css';

import React from 'react';
import { Data, temp } from './tree-data';
import { runInAction, toJS } from 'mobx';
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';
import { observer } from 'mobx-react-lite';
import { AiFillFile, AiFillFolder } from 'react-icons/ai';

interface TreeProps {
  nodes: Data[];
  onClick?: (node: Data) => void;
  onToggle?: (node: Data, value: boolean) => void;
  onExpand?: (node: Data) => void;
  onCollapse?: (node: Data) => void;
}

interface TreeNodeProps {
  node: Data;
  onClick?: (node: Data) => void;
  onToggle?: (node: Data, value: boolean) => void;
  onExpand?: (node: Data) => void;
  onCollapse?: (node: Data) => void;
}

const TreeNodeComponent: React.FC<TreeNodeProps> = observer(
  ({ node, onToggle, onClick, onCollapse, onExpand }) => {
    const handleToggle = () => {
      const expandStatus = !node.isExpanded;

      onToggle?.(node, expandStatus);

      expandStatus ? onExpand?.(node) : onCollapse?.(node);
    };

    const onNodeClick = (node: Data) => {
      onClick?.(node);
    };

    return (
      <div className="custom-tree-node">
        <div
          className={`custom-tree-node-content flex-help ${
            node.isSelected ? 'custom-tree-node-content-selected' : ''
          }`}
        >
          <span className="flex-help" onClick={handleToggle} style={{ cursor: 'pointer' }}>
            {node.isExpanded ? <BiChevronDown size={20} /> : <BiChevronRight size={20} />}
          </span>

          {/* <div>
            {node.isFile ? <AiFillFile color="#6bc7f6" /> : <AiFillFolder color="#f6cf60" />}
          </div> */}

          <div style={{ flex: 1 }} onClick={() => onNodeClick(node)}>
            {node.name}
          </div>
        </div>
        {node.isExpanded && node.children !== undefined && node.children.length > 0 && (
          <div style={{ marginLeft: '20px' }}>
            {node.children.map(child => (
              <TreeNodeComponent
                key={child.id}
                node={child}
                onToggle={onToggle}
                onClick={onClick}
                onCollapse={onCollapse}
                onExpand={onExpand}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

const Tree: React.FC<TreeProps> = observer(({ nodes, onToggle, onClick, onCollapse, onExpand }) => {
  return (
    <>
      {nodes.map(node => (
        <TreeNodeComponent
          key={node.id}
          node={node}
          onToggle={onToggle}
          onClick={onClick}
          onCollapse={onCollapse}
          onExpand={onExpand}
        />
      ))}
    </>
  );
});

export const CustomTree: React.FC = () => {
  return (
    <>
      <button onClick={() => console.log(toJS(temp.state))}>log state</button>
      <button onClick={() => temp.delete('100')}>delete id 100</button>
      <button onClick={() => temp.delete('3')}>delete id 3</button>
      <button onClick={() => runInAction(() => temp.state.push(...getTestData()))}>
        add test data
      </button>
      <button
        onClick={() =>
          runInAction(() => {
            temp.state[0]?.children![0]?.children?.[0]?.children?.push(...getTestData());
          })
        }
      >
        add test data deep first node
      </button>
      <button onClick={() => temp.updateToggle(temp.state[0], true)}>expand first node</button>
      <button onClick={() => temp.updateToggle(temp.state[0]!.children![0], true)}>
        expand first first node
      </button>
      <button onClick={() => temp.recursiveAll(n => (n.isExpanded = true))}>expand all</button>
      <button onClick={() => temp.recursiveAll(n => (n.isExpanded = false))}>collapse all</button>
      <button onClick={() => temp.updateName(temp.state[0], 'Niggeria')}>update name</button>

      <Tree
        nodes={temp.state}
        onToggle={(node: Data, value: boolean) => temp.updateToggle(node, value)}
        onClick={(node: Data) => {
          // 1. It is better to select node first for animation speed
          temp.updateIsSelected(node);

          // 2. And then recusrively deselect others except the selected node
          temp.recursiveAll(n => {
            if (n.id !== node.id) {
              n.isSelected = false;
            }
          });
        }}
      />
    </>
  );
};

function getTestData() {
  return [
    new Data({
      id: '40',
      name: 'XX',
      isFile: false,
      children: [
        new Data({ id: 'x1', name: 'Alice', isSelected: false, isExpanded: false, isFile: true }),
        new Data({ id: 'x2', name: 'Bob', isSelected: false, isExpanded: false, isFile: true }),
        new Data({ id: 'x3', name: 'Charlie', isSelected: false, isExpanded: false, isFile: true }),
      ],
      isSelected: true,
      isExpanded: true,
    }),
    new Data({
      id: '50',
      name: 'MM',
      isFile: false,
      children: [
        new Data({ id: 'm1', name: 'Alice', isSelected: false, isExpanded: false, isFile: true }),
        new Data({ id: 'm2', name: 'Bob', isSelected: false, isExpanded: false, isFile: true }),
        new Data({ id: 'm3', name: 'Charlie', isSelected: false, isExpanded: false, isFile: true }),
      ],
      isSelected: false,
      isExpanded: false,
    }),
  ];
}
