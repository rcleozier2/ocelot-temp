import React, { Component } from "react";
import axios from "axios";
import { ProgressBar } from "primereact/progressbar";
import { Tabs, Tab } from "react-bootstrap";

import Navigation from "../layout/Navigation/Navigation";
import ZoneTableRealTime from "../components/ZoneTable/ZoneTableRealTime";
import DriverTableRealTime from "../components/DriverTable/DriverTableRealTime";
import DeliverySummary from "../components/DeliverySummary/DeliverySummary";
import DeliveryChart from "../components/Charts/DeliveryChart";
import DeliveryStats from "../components/DeliveryStats/DeliveryStats";
import endpoints from "../config/endpoints";
import normalize from "../helpers/normalize";
import DriverStatsRealTime from "../components/DriverStats/DriverStatsRealTime";

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
          <div className="row">
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
              <br />
              <div className="row">
                  <div className="col-3"> 
                    <DeliverySummary tasks={this.state.tasks}/>
                   </div>
                   <div className="col-3"> 
                    <DeliveryStats tasks={this.state.tasks}/>
                   </div>
                  <div className="col-3"> 
                    <DeliveryChart tasks={this.state.tasks} />
                  </div>
              </div>
              <br />

              <br />
              <div className="row">
                <div className="col-12">
                  <Tabs
                    defaultActiveKey="driverstats"
                    id="data"
                    variant="pills"
                  >
                    <Tab eventKey="driverstats" title="Driver Stats">
                      <br />
                      <DriverStatsRealTime drivers={this.state.drivers} />
                    </Tab>

                    <Tab eventKey="driverdata" title="Driver Capacity Grid">
                      <br />
                      <DriverTableRealTime
                        tasks={this.state.tasks}
                        drivers={this.state.drivers}
                      />
                    </Tab>

                    <Tab eventKey="zonedata" title="Zone Capacity Grid">
                      <br />
                      <ZoneTableRealTime
                        tasks={this.state.tasks}
                        drivers={this.state.drivers}
                      />
                    </Tab>

                
                  </Tabs>
                </div>
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
