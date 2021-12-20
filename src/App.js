import React from 'react';
import logo from './logo.svg';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './api/firebaseConfig';
import Login from './pages/Login';
import './App.css';

initializeApp(firebaseConfig);

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Login />
      </header>
    </div>
  );
}

export default App;
