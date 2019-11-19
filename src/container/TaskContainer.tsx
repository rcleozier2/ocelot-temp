import React, { Component } from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router";
import { ProgressBar } from "primereact/progressbar";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";

import endpoints from "../config/endpoints";
import taskExtractor from "../helper/taskExtractor";

interface State {
  task: any;
}

class TaskContainer extends React.Component<RouteComponentProps<any>> {
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
        let task = taskExtractor(res.data);
        this.setState({
          task
        });
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  render() {
    const MyMapComponent = withScriptjs(
      withGoogleMap((props: any) => (
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: this.state.task.location[0], lng: this.state.task.location[1] }}
        >
          {props.isMarkerShown && (
            <Marker position={{ lat: this.state.task.location[0], lng: this.state.task.location[1]}} />
          )}
        </GoogleMap>
      ))
    );

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


            <p> {this.state.task.completed }</p>
            <p> {this.state.task.failureNotes}</p>


            <p> Total Time: {this.state.task.totalTime}</p>
            
            {this.state.task.taskChain.map(function(chain: any, index: number){
            return (<span key={ index }>{chain.name} -> {chain.timestampDistance} ->  </span>);
            })}
            
          </>
        ) : (
          <ProgressBar mode="indeterminate" />
        )}
      </>
    );
  }
}

export default TaskContainer;
