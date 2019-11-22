interface Endpoints {
  usersApiUrl: string;
  historicalApiUrl: string;
  tasksApiUrl: string;
}

const endpoints: Endpoints = {
  usersApiUrl: "https://www.medly.link/v1/onfleet/users",
  historicalApiUrl: "https://www.medly.link/v1/onfleet/capacity/getHistorical/",
  tasksApiUrl: "https://www.medly.link/v1/onfleet/task/"
};

export default endpoints;