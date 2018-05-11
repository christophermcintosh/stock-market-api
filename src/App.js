import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AllStocks from './AllStocks';
import SingleStock from './SingleStock';
import Navbar from './Navbar';
import Footer from './Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={AllStocks} />
          <Route path="/:symbol" component={SingleStock} />
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
