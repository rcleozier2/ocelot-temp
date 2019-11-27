import React, { Component } from "react";
import axios from "axios";
import { ProgressBar } from "primereact/progressbar";

import Navigation from "../layout/Navigation/Navigation";
import ZoneTableRealTime from "../components/ZoneTable/ZoneTableRealTime";
import DriverTableRealTime from "../components/DriverTable/DriverTableRealTime";
import endpoints from "../config/endpoints";
import normalize from "../helpers/normalize";

interface State {
  tasks: any;
  drivers: null | Array<any>;
  state: string;
}

let intervalId: any = null;

class Ocelot extends Component {
  state: State = {
    tasks: null,
    drivers: null,
    state: "newyork"
  };

  constructor(props: any) {
    super(props);
    let intervalTime = 60 * 1000; // Every minute

    this.fetchRealTimeData = this.fetchRealTimeData.bind(this);
    intervalId = setInterval(this.fetchRealTimeData, intervalTime);
  }

  async componentDidMount() {
    await this.fetchRealTimeData();
  }

  componentWillReceiveProps() {
    clearInterval(intervalId);
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
                  <DriverTableRealTime
                    tasks={this.state.tasks}
                    drivers={this.state.drivers}
                  />
                </div>
                <br />
                <br />
                <div className="page-container__data-table data-container">
                  <ZoneTableRealTime
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
