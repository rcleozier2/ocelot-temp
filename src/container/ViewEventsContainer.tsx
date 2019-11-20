import React, { Component } from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router";
import { ProgressBar } from "primereact/progressbar";

import endpoints from "../config/endpoints";
import EventsView from "../components/tables/EventsView";

interface State {
  events: any;
}

class ViewEventsContainer extends React.Component<RouteComponentProps<any>> {
  state: State = {
    events: null
  };

  async componentWillMount() {
    await this.fetchTaskData(this.props.match.params.id);
  }

  async fetchTaskData(taskId: string) {
    await axios
      .get(`${endpoints.tasksApiUrl}${taskId}`)
      .then(res => {
        this.setState({
          events: res.data
        });
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  render() {
    return (
      <>
        {this.state.events != null ? (
          <EventsView events={this.state.events} />
        ) : (
          <ProgressBar mode="indeterminate" />
        )}
      </>
    );
  }
}

export default ViewEventsContainer;
