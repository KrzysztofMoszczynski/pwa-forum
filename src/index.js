import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Register from './pages/Register';
import Login from './pages/Login';
import MyList from './pages/MyList';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import RequireAuth from './helpers/RequireAuth';
import RequireLogOut from './helpers/RequireLogOut';
import { AuthProvider } from './context/Auth';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <RequireLogOut redirectTo={'/mylist'}>
              <App />
            </RequireLogOut>
          }
        />
        <Route
          path='register'
          element={
            <RequireLogOut redirectTo={'/mylist'}>
              <Register />
            </RequireLogOut>
          }
        />
        <Route
          path='login'
          element={
            <RequireLogOut redirectTo={'/mylist'}>
              <Login />
            </RequireLogOut>
          }
        />
        <Route
          path='mylist'
          element={
            <RequireAuth redirectTo={'/'}>
              <MyList />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
