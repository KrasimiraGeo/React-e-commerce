import './App.css';

import { Route, Router } from 'react-router-dom'
import { Switch } from 'react-router-dom';

import { LandingPage } from './pages/LandingPage'
import { ShopPage } from './pages//Shop/ShopPage'
import { Fragment } from 'react';
import { Upload } from './pages/Admin/Upload'
import { LoginForm } from './components/LoginForm/LoginForm';
import { Cart } from './components/Cart/Cart';

function App() {
  return (
    <Fragment>
      <Route path='/' exact>
        <LandingPage />
      </Route>
      <Switch>
        <Route path='/shop'>
          <ShopPage />
        </Route>
        <Route path='account'>
          <LoginForm />
        </Route>
        <Route path='cart'>
          <Cart/>
        </Route>
        <Route path='/upload'>
          <Upload />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
