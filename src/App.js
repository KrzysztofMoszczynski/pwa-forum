import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './api/firebaseConfig';
import { Button } from '@mui/material';
import './App.css';

initializeApp(firebaseConfig);

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
