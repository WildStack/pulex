import { CustomTree } from './example/with-builtin-class';
import { CustomTreeUsingCustomModel } from './example/with-custom-class';

function App() {
  return (
    <>
      <div style={{ marginLeft: 20, marginTop: 20 }}>
        <h2>Custom tree using built in class</h2>
        <br />
        <br />
        <CustomTree />
        <br />
        <br />
        <hr />
        <br />
        <br />
        <br />
        <br />
        <h2>Custom tree using custom class</h2>
        <br />
        <br />

        <CustomTreeUsingCustomModel />
      </div>
    </>
  );
}

export default App;
