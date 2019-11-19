import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";

import HomeContainer from "./container/HomeContainer";
import TaskContainer from "./container/TaskContainer";

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Router>
          <Switch>
            <Route path="/" exact component={HomeContainer} />
            <Route path="/task/:id" exact component={TaskContainer} />
          </Switch>
        </Router>
        <Footer />
      </>
    );
  }
}

export default App;
