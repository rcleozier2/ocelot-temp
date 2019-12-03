import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";

import HistoricalContainer from "./container/HistoricalContainer";
import DriverTaskContainer from "./container/ViewTaskContainer";
import ViewEventsContainer from "./container/ViewEventsContainer";
import RealTimeContainer from "./container/RealTimeContainer";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={RealTimeContainer} />
            <Route path="/historical" exact component={HistoricalContainer} />
            <Route
              path="/view/task/:id"
              exact
              component={DriverTaskContainer}
            />
            <Route
              path="/view/events/:id"
              exact
              component={ViewEventsContainer}
            />
          </Switch>
        </Router>
        <Footer />
      </>
    );
  }
}

export default App;
