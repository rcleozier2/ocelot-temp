import React, { Component } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";

import HomeContainer from "./container/HomeContainer";
import DriverTaskContainer from "./container/DriverTaskContainer";
import ViewEventsContainer from "./container/ViewEventsContainer";

import "./App.scss";
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <>
    
        <Router>
        <Header />
          <Switch>
            <Route path="/" exact component={HomeContainer} />
            <Route path="/driver/task/:id" exact component={DriverTaskContainer} />
            <Route path="/view/events/:id" exact component={ViewEventsContainer} />
          </Switch>
        </Router>
        <Footer />
      </>
    );
  }
}

export default App;
