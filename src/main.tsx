import { configure } from 'mobx';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

configure({
  enforceActions: 'always',
  useProxies: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
});

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
