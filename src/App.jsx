import React, { Component } from 'react';
import {} from 'antd'
import {Route,BrowserRouter,Switch,Routes} from 'react-router-dom'
import Login from './pages/login'
import Admin from './pages/admin'

class App extends Component {
  render() {
    return (
      <>
    <BrowserRouter>

       <Switch>
         
       <Route path='/login'  component={Login } />
        <Route path='/'  component={Admin} />
     
       </Switch>
   
    </BrowserRouter>
      </>
    );
  }
}

export default App;

