import React from 'react';
import { Route } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Configuracao from './pages/Configuracao';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/settings">
          <Configuracao />
        </Route>
      </header>
    </div>
  );
}
