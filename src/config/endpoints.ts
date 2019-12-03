interface Endpoints {
  usersApiUrl: string;
  realtimeApiUrl: string;
  historicalApiUrl: string;
  tasksApiUrl: string;
  zipcodeSearchApi: string;
}

const endpoints: Endpoints = {
  usersApiUrl: "https://www.medly.link/v1/onfleet/users",
  realtimeApiUrl: "https://www.medly.link/v1/onfleet/capacity/getrealtime/",
  historicalApiUrl: "https://www.medly.link/v1/onfleet/capacity/getHistorical/",
  tasksApiUrl: "https://www.medly.link/v1/onfleet/task/",
  zipcodeSearchApi: "https://www.medly.link/v1/zip/"
};

export default endpoints;