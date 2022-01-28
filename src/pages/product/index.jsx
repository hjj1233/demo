import React, { Component } from 'react';
import {Switch,Redirect,Route} from 'react-router-dom'
import AddUpdate from './addUpdate';
import Detail from './detail';
import Home from './home';


class Product extends Component {
  render() {
    return (
      <div>
       <Switch>
         <Route path='/product' component={Home} exact />
         <Route path='/product/addUpdate' component={AddUpdate} />
         <Route path='/product/detail' component={Detail} />
         <Redirect to='/product' />
       </Switch>
      </div>
    );
  }
}

export default Product;