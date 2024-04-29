## @pulexui/core

```
npm i @pulexui/core
```

###### Inspired from daphnia pulex
![ImageAlt](https://github.com/WildStack/pulex/blob/master/readme/logo.png?raw=true)

### components
* Mobx tree (Tree component completely integrated to mobx)

<br />

### Example code (more examples in src/example directory)
```tsx
import { MobxTree } from '@pulexui/core';

export const App = () => {
  const store = new ExampleMobxTreeState();
  
  return (
    <>
      <h1>Pulex working baby</h1>

      {/* Use observable array from mobx in nodes */}
      <MobxTree
        compact={false}
        // or nodes={store.state}
        nodes={[{ id: '100', name: 'Unread', isSelected: false, isExpanded: false, isFile: false }]}
        onToggle={(node, value) => store.updateToggle(node, value)}
        onClick={node => {
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
          e.preventDefault();
          console.log('Right Click', e.pageX, e.pageY, toJS(node));
        }}
        renderTypeIcon={node => {
          if (node.isFile) {
            return <>FILE</>;
          }

          return <>FOLDER</>;
        }}
        renderArrowIcon={node => (node.isExpanded ? <>&#8595;</> : <>&#8594;</>)}
      />
    </>
  );
}
```

