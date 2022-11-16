import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
//Data
import projects from './data/projects.json';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App
      data={projects}
    />
  </React.StrictMode>
);

