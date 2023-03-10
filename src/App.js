import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route path="/" component={ Login } exact />
      <Route path="/carteira" component={ Wallet } />
    </Switch>
  );
}
//
export default App;
