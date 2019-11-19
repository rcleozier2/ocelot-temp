import React, { Component } from "react";
import axios from "axios";
import { format } from "date-fns";
import { ProgressBar } from "primereact/progressbar";
import { Calendar } from "primereact/calendar";

import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import TableView from "../components/tables/TableView";
import DriverTableView from "../components/tables/DriverTableView";
import BarChartView from "../components/charts/BarChartView";
import PieChartView from "../components/charts/PieChartView";

import endpoints from "../config/endpoints";
import normalizeResponse from "../helper/normalize";

import "./scss/Ocelot.scss";
import "./scss/Reset.scss";

interface State {
  tasks: any;
  drivers: null | Array<any>;
  displayDate: string;
  date: Date;
  state: string;
  queryParams: string;
}

class Ocelot extends Component {
  state: State = {
    tasks: null,
    drivers: null,
    displayDate: "10/29/2019",
    date: new Date(),
    state: "newyork",
    queryParams: "?year=2019&month=10&day=29"
  };

  async fetchUserData() {
    await axios
      .get(`${endpoints.usersApiUrl}`)
      .then(res => {})
      .catch(err => console.log(`Error: ${err}`));
  }

  async fetchHistoricalData(queryParams: string) {
    await axios
      .get(`${endpoints.historicalApiUrl}${this.state.state}${queryParams}`)
      .then(res => {
        let response = normalizeResponse(res.data);

        this.setState({
          tasks: response.tasks,
          drivers: response.drivers
        });
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  async componentWillMount() {
    await this.fetchHistoricalData(this.state.queryParams);
  }

  handleDateChange = (date: any) => {
    const month = format(date, "M");
    const day = format(date, "dd");
    const year = format(date, "yyyy");
    const queryParams = `?year=${year}&month=${month}&day=${day}`;

    this.setState(
      {
        tasks: null,
        date: date,
        displayDate: format(date, "MM/dd/yyyy"),
        queryParams
      },
      () => {
        this.fetchHistoricalData(queryParams);
      }
    );
  };

  handleStateSelectionChange = (event: any) => {
    this.setState(
      {
        tasks: null,
        state: event.target.value
      },
      () => {
        this.fetchHistoricalData(this.state.queryParams);
      }
    );
  };

  render() {
    return (
      <>
        <Header />
        <div className="page-container">
          <div className="data-container">
            Select a date &nbsp;
            <Calendar
              dateFormat="mm/dd/yy"
              value={this.state.date}
              onChange={e => this.handleDateChange(e.value)}
            ></Calendar>
            &nbsp; Select a state &nbsp;
            <select onChange={this.handleStateSelectionChange}>
              <option value="newyork"> New York </option>
              <option value="newjersey"> New Jesey </option>
              <option value="pennsylvania"> Pennsylvania</option>
            </select>
            &nbsp; |<span> Historical data for {this.state.displayDate} </span>
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
                  <TableView
                    tasks={this.state.tasks}
                    drivers={this.state.drivers}
                  />
                </div>
                {/* <div className="page-container__data-charts">
                  <div className="page-container__data-chart data-container-half">
                    <BarChartView
                      tasks={this.state.tasks}
                      drivers={this.state.drivers}
                    />
                  </div>
                  <div className="page-container__data-chart data-container-half">
                    <PieChartView
                      tasks={this.state.tasks}
                      drivers={this.state.drivers}
                    />
                  </div>
                </div> */}
                <br />
                <br />
              </div>
            </>
          ) : (
            <ProgressBar mode="indeterminate" />
          )}
        </div>
        <Footer />
      </>
    );
  }
}

export default Ocelot;
