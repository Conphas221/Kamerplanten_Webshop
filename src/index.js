import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'normalize.css';

// pages
import Charts from './pages/Charts';
import Home from './pages/Home';
import Overview from './pages/Overview';
import ProductSingle from './pages/ProductSingle';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AboutUs from './pages/AboutUs';
import NotFound from './pages/NotFound';
import WishList from './pages/WishList';
import Search from './pages/Search';
import WinkelMand from './pages/WinkelMand';
import Account from './pages/Account';
import Payment from './pages/Payment';
import CUserView from './pages/CUserView';
import CUserUpdate from './pages/CUserUpdate';
import CUserDelete from './pages/CUserDelete';
import CUserCreate from './pages/CUserCreate';
import CProductView from './pages/CProductView';
import CProductUpdate from './pages/CProductUpdate';
import CProductDelete from './pages/CProductDelete';
import CProductCreate from './pages/CProductCreate';
import AccountGegevens from './pages/AccountUpdate';
import BView from './pages/BView';
import Loguit from './pages/LogUit';
            // 1	Bloembollen
            // 2	Fruitbomen
            // 3	Kamerplanten
            // 4	Rozen
            // 5	Zaden

// styles
import './styles.scss';// eslint-disable-next-line



ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/overzicht" component={Overview} />
      <Route exact path="/overzicht/:cID" component={Overview} />
      <Route exact path="/overzicht/pagina/:page" component={Overview} />
      <Route exact path="/product/:id" component={ProductSingle} />
      <Route exact path="/product/:categorieID" component={ProductSingle} />
      <Route exact path="/inloggen" component={Login} />
      <Route exact path="/account" component={Account} />
      <Route exact path="/SignUp" component={SignUp} />
      <Route exact path="/Loguit" component={Loguit} />
      <Route exact path="/crud/user/view" component={CUserView} /> 
      <Route exact path="/crud/user/update" component={CUserUpdate} /> 
      <Route exact path="/crud/user/delete" component={CUserDelete} /> 
      <Route exact path="/crud/user/create" component={CUserCreate} /> 
      <Route exact path="/crud/product/view" component={CProductView} /> 
      <Route exact path="/crud/product/update" component={CProductUpdate} /> 
      <Route exact path="/crud/product/delete" component={CProductDelete} /> 
      <Route exact path="/crud/product/create" component={CProductCreate} /> 
      <Route exact path="/bestellingen" component={BView} /> 
      <Route exact path="/mijngegevens" component={AccountGegevens} /> 
      <Route exact path="/AboutUs" component={AboutUs} />
      <Route exact path="/WishList" component={WishList} />
      <Route exact path="/Search" component={Search} />
      <Route exact path="/Search/:queryd" component={Search} />
      <Route exact path="/winkelmand" component={WinkelMand} />
      <Route exact path="/Payment" component={Payment} />
      <Route exact path="/Charts" component={Charts} />

      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
