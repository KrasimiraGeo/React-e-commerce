import './App.css';

import { Route } from 'react-router-dom'

import { LandingPage } from './pages/LandingPage'
import { ShopPage } from './pages//Shop/ShopPage'
import { Fragment } from 'react';
import { Download } from './pages/Admin/operations/Download';
import { AdminPage } from './pages/Admin/AdminPage';
import { LoginForm } from './components/LoginForm/LoginForm';

function App() {
  return (
    <Fragment>
      <Route path='/' exact>
        <LandingPage />
      </Route>
      <Route path='/shop'>
        <ShopPage />
      </Route>
      <Route path='/account'>
        <LoginForm />
      </Route>
    </Fragment>
  );
}

export default App;
