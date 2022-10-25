import './App.css';

import { Route } from 'react-router-dom'

import { LandingPage } from './pages/LandingPage'
import { ShopPage } from './pages//Shop/ShopPage'
import { Fragment } from 'react';
import { Download } from './pages/Admin/Download';
import { AdminPage } from './pages/Admin/AdminPage';

function App() {
  return (
    <Fragment>
      <Route path='/' exact>
        <LandingPage />
      </Route>
      <Route path='/download'>
        <Download />
      </Route>
      <Route path='/shop'>
        <ShopPage />
      </Route>
      <Route path='/admin-upload'>
        <AdminPage />
      </Route>

    </Fragment>
  );
}

export default App;
