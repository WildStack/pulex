import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { configure } from 'mobx';

configure({
  enforceActions: 'always',
  useProxies: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
});

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

//TODO remove index.scss, app.tsx, all example folders (move this one to example section or something in github)
//TODO rename project to @pulex/core
//TODO push to npm as library via github package registry https://www.youtube.com/watch?v=KV5XFwfvnEI

// microscopic water flies
// The microscopic water flies (dafnia pulex) is the most complex organism on earth
