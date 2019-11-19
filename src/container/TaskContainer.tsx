import React, { Component } from "react";
import axios from "axios";

import endpoints from "../config/endpoints";

interface State {
  task: any;
}

class TaskContainer extends Component {
  state: State = {
    task: null
  };

  async fetchTaskData(taskId: string) {
    await axios
      .get(`${endpoints.tasksApiUrl}${taskId}`)
      .then(res => {})
      .catch(err => console.log(`Error: ${err}`));
  }

  render() {
    return "Task Container";
  }
}

export default TaskContainer;
