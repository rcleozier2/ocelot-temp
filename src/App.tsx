import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import HomeContainer from "./container/HomeContainer";
import TaskContainer from "./container/TaskContainer";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={HomeContainer} />
          <Route path="/task/:id" component={TaskContainer} />
        </Switch>
      </Router>
    );
  }
}

export default App;
