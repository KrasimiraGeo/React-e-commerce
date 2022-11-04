import './App.css';

import { Route } from 'react-router-dom'

import { LandingPage } from './pages/LandingPage'
import { ShopPage } from './pages//Shop/ShopPage'
import { Fragment } from 'react';
import {Upload} from './pages/Admin/Upload'

function App() {
  return (
    <Fragment>
      <Route path='/' exact>
        <LandingPage />
      </Route>
      <Route path='/shop'>
        <ShopPage />
      </Route>
      <Route path='/upload'>
        <Upload />
      </Route>
    </Fragment>
  );
}

export default App;
