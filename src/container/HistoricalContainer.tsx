import React, { Component } from "react";
import axios from "axios";
import { format, startOfYesterday } from "date-fns";
import { ProgressBar } from "primereact/progressbar";
import { Calendar } from "primereact/calendar";

import Navigation from "../layout/Navigation/Navigation";
import ZoneTable from "../components/ZoneTable/ZoneTable";
import DriverTable from "../components/DriverTable/DriverTable";
import endpoints from "../config/endpoints";
import normalize from "../helpers/normalize";

interface State {
  tasks: any;
  drivers: null | Array<any>;
  date: Date;
  state: string;
  queryParams: string;
}

const yesterday = startOfYesterday();
const defaultDate = {
  month: format(yesterday, "M"),
  day: format(yesterday, "dd"),
  year: format(yesterday, "yyyy")
};

class HistoricalContainer extends Component {
  state: State = {
    tasks: null,
    drivers: null,
    date: yesterday,
    state: "newyork",
    queryParams: `?year=${defaultDate.year}&month=${defaultDate.month}&day=${defaultDate.day}`
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
        let response = normalize(res.data);

        this.setState({
          tasks: response.tasks,
          drivers: response.drivers
        });
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  async componentDidMount() {
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
            <div className="col-2 negative-margin-top">
              <p className="m-0"> Select a date </p>
              <Calendar
                dateFormat="mm/dd/yy"
                value={this.state.date}
                onChange={e => this.handleDateChange(e.value)}
              ></Calendar>
            </div>
          </div>
          {this.state.tasks != null ? (
            <>
              <div className="page-container__data">
                <div className="page-container__data-table data-container">
                  <DriverTable
                    tasks={this.state.tasks}
                    drivers={this.state.drivers}
                  />
                </div>
                <div className="page-container__data-table data-container">
                  <ZoneTable
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

export default HistoricalContainer;
