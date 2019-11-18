import React, { Component } from "react";
import axios from "axios";
import { format } from "date-fns";
import { ProgressBar } from "primereact/progressbar";
import { Calendar } from "primereact/calendar";

import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import TableView from "../components/TableView";
import BarChartView from "../components/BarChartView";
import PieChartView from "../components/PieChartView";

import endpoints from "../config/endpoints";
import normalizeResponse from '../helper/normalize';

import "./Ocelot.scss";
import "./Reset.scss";

interface State {
  tasks: null | Array<any>;
  drivers: null | Array<any>;
  displayDate: string;
  date: Date;
}

class Ocelot extends Component {

  state: State = {
    tasks: null,
    drivers: null,
    displayDate: "10/29/2019",
    date: new Date()
  };

  async fetchHistoricalData(queryParam: string) {
    await axios
      .get(`${endpoints.apiUrl}${queryParam}`)
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
    const queryParam: string = "?year=2019&month=10&day=29";
    await this.fetchHistoricalData(queryParam);
  }

  handleDateChange = (date: any) => {
    this.setState({
      zones: null,
      date: date,
      displayDate: format(date, "MM/dd/yyyy")
    });

    const month = format(date, "M");
    const day = format(date, "dd");
    const year = format(date, "yyyy");
    const queryParam = `?year=${year}&month=${month}&day=${day}`;
    this.fetchHistoricalData(queryParam);
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
            &nbsp;
            <span> Historical data for {this.state.displayDate} </span>
          </div>
          {this.state.tasks != null ? (
            <>
              <div className="page-container__data">
                <div className="page-container__data-table data-container">
                  <TableView
                    tasks={this.state.tasks}
                    drivers={this.state.drivers}
                  />
                </div>
                <div className="page-container__data-charts">
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
                </div>
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
