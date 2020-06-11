import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Contatos from './pages/Contatos';
import EditContato from './pages/EditContato';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Contatos} path="/" exact/>
      <Route component={Contatos} path="/contatos"/>
      <Route component={EditContato} path="/editContato"/>
    </BrowserRouter>
  );
}

export default Routes;