import './App.css';
import { Route } from 'react-router-dom'
import { Switch } from 'react-router-dom';
import { useContext } from 'react';
import { Fragment } from 'react';
import { LandingPage } from './pages/LandingPage'
import { ShopPage } from './pages/Shop/ShopPage'
import { Upload } from './pages/Admin/Upload'
import { LoginForm } from './components/LoginForm/LoginForm';
import { Cart } from './components/Cart/Cart';
import { OrderForm } from './components/OrderForm/OrderForm';
import { About } from './components/About/About';
import { AuthContext } from '../src/store/auth-context'

function App() {

  const authCtx = useContext(AuthContext)

  return (
    <Fragment>
      <Route path='/' exact>
        <LandingPage />
      </Route>
      <Switch>
        <Route path='/shop'>
          <ShopPage />
        </Route>
        {authCtx.isLoggedIn && <Route path='account'>
          <LoginForm />
        </Route>}
        <Route path='shop/cart' exact>
          <Cart />
        </Route>
        <Route path='shop/cart/order'>
          <OrderForm/>
        </Route>
        {authCtx.isAdmin && <Route path='/upload'>
          <Upload />
        </Route>}
        <Route path='shop/about'>
          <About/>
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
