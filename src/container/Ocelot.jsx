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

import "./Ocelot.scss";
import "./Reset.scss";

class Ocelot extends Component {
  state = {
    zones: null,
    drivers: null,
    displayDate: "10/29/2019",
    date: new Date()
  };

  async fetchHistoricalData(queryParam) {
    await axios
      .get(`${endpoints.apiUrl}${queryParam}`)
      .then(res => {
        this.setState({
          zones: res.data.zoneTable,
          drivers: res.data.driverTable
        });
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  async componentWillMount() {
    const queryParam = "?year=2019&month=10&day=29";
    await this.fetchHistoricalData(queryParam);
  }

  handleDateChange = date => {
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
          {this.state.zones != null ? (
            <>
              <div className="page-container__data">
                <div className="page-container__data-table data-container">
                  <TableView
                    zones={this.state.zones}
                    drivers={this.state.drivers}
                  />
                </div>
                <div className="page-container__data-charts">
                  <div className="page-container__data-chart data-container-half">
                    {/* <BarChartView
                      zones={this.state.zones}
                      drivers={this.state.drivers}
                    /> */}
                  </div>
                  <div className="page-container__data-chart data-container-half">
                    {/* <PieChartView
                      zones={this.state.zones}
                      drivers={this.state.drivers}
                    /> */}
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
      </>
    );
  }
}

export default Ocelot;
