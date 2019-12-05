import React from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router";
import { ProgressBar } from "primereact/progressbar";
import endpoints from "../config/endpoints";
import eventExtractor from "../helpers/event-extractor";

import EventDetails from "../components/EventDetails/EventDetails";
import GoogleMap from "../components/GoogleMap/GoogleMap";

interface State {
  task: any;
}

class ViewTaskContainer extends React.Component<RouteComponentProps<any>> {
  state: State = {
    task: null
  };

  async componentDidMount() {
    await this.fetchTaskData(this.props.match.params.id);
  }

  async fetchTaskData(taskId: string) {
    await axios
      .get(`${endpoints.tasksApiUrl}${taskId}`)
      .then(res => {
        let task = eventExtractor(res.data);
        this.setState({
          task
        });
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  render() {
    return (
      <>
        {this.state.task != null ? (
          <div className="main-container">
            <div className="summary-container col-6">
              <EventDetails normalizedTask={this.state.task} />
            </div>
            <div className=" col-5" style={{ height: "450px" }}>
              <GoogleMap location={this.state.task.location} />
            </div>
            <div className="row">
              <div
                className="summary-container col-12"
                style={{ display: "none" }}
              >
                {this.state.task.taskChain.map(function(
                  chain: any,
                  index: number
                ) {
                  return (
                    <span key={index}>
                      {chain.name} -> {chain.timestampDistance} ->{" "}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="col-4 mx-auto mt-5">
            <ProgressBar mode="indeterminate" />
          </div>
        )}
      </>
    );
  }
}

export default ViewTaskContainer;
