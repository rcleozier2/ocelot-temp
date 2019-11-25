import React, { Component } from "react";
import axios from "axios";
import { format } from "date-fns";
import { ProgressBar } from "primereact/progressbar";

import Navigation from "../layout/Navigation/Navigation";
import ZoneTableView from "../components/ZoneTableView/ZoneTableView";
import DriverTableView from "../components/DriverTableView/DriverTableView";
import endpoints from "../config/endpoints";
import normalize from "../helpers/normalize";

interface State {
  tasks: any;
  drivers: null | Array<any>;
  state: string;
}

class Ocelot extends Component {
  state: State = {
    tasks: null,
    drivers: null,
    state: "newyork"
  };

  async fetchUserData() {
    await axios
      .get(`${endpoints.realtimeApiUrl}`)
      .then(res => {})
      .catch(err => console.log(`Error: ${err}`));
  }

  async fetchRealTimeData() {
    await axios
      .get(`${endpoints.realtimeApiUrl}${this.state.state}`)
      .then(res => {
        let response = normalize(res.data);

        this.setState({
          tasks: response.tasks,
          drivers: response.drivers
        });
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  async componentDidMount() {
    await this.fetchRealTimeData();
  }

  handleStateSelectionChange = (event: any) => {
    this.setState(
      {
        tasks: null,
        state: event.target.value
      },
      () => {
        this.fetchRealTimeData();
      }
    );
  };

  render() {
    return (
      <>
        <Navigation />
        <div className="page-container">
          <div className="data-container row">
            <div className="col-2 negative-margin-top">
              <p className="m-0"> Select a state </p>
              <form>
                <div className="form-group">
                  <select
                    className="form-control"
                    onChange={this.handleStateSelectionChange}
                  >
                    <option value="newyork"> New York </option>
                    <option value="newjersey"> New Jersey </option>
                    <option value="pennsylvania"> Pennsylvania</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
          {this.state.tasks != null ? (
            <>
              <div className="page-container__data">
                <div className="page-container__data-table data-container">
                  <DriverTableView
                    tasks={this.state.tasks}
                    drivers={this.state.drivers}
                  />
                </div>
                <div className="page-container__data-table data-container">
                  <ZoneTableView
                    tasks={this.state.tasks}
                    drivers={this.state.drivers}
                  />
                </div>
                <br />
                <br />
              </div>
            </>
          ) : (
            <div className="col-4 mx-auto mt-5">
              <ProgressBar mode="indeterminate" />
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Ocelot;