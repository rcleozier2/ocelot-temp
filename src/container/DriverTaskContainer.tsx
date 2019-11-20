import React from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router";
import { ProgressBar } from "primereact/progressbar";
import endpoints from "../config/endpoints";
import eventExtractor from "../helpers/event-extractor";

interface State {
  task: any;
}

class DriverTaskContainer extends React.Component<RouteComponentProps<any>> {
  state: State = {
    task: null
  };

  async componentWillMount() {
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
          <>
            <p> {this.state.task.driver}</p>
            <p> {this.state.task.admin}</p>

            <p> Distance {this.state.task.distance}</p>
            <p> {this.state.task.estimatedArrivalTime}</p>
            <p> {this.state.task.actualArrivalTime}</p>

            <p> {this.state.task.estimatedCompletionTime}</p>
            <p> {this.state.task.actualCompletionTime}</p>

            <p> {this.state.task.arrivalTimeDifference}</p>
            <p> {this.state.task.completionTimeDifference}</p>

            <p> {this.state.task.completed}</p>
            <p> {this.state.task.failureNotes}</p>

            <p> Total Time: {this.state.task.totalTime}</p>

            {this.state.task.taskChain.map(function(chain: any, index: number) {
              return (
                <span key={index}>
                  {chain.name} -> {chain.timestampDistance} ->{" "}
                </span>
              );
            })}
          </>
        ) : (
          <ProgressBar mode="indeterminate" />
        )}
      </>
    );
  }
}

export default DriverTaskContainer;
