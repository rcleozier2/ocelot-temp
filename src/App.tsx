import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";

import HomeContainer from "./container/HomeContainer";
import DriverTaskContainer from "./container/DriverTaskContainer";
import ViewEventsContainer from "./container/ViewEventsContainer";

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Router>
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
