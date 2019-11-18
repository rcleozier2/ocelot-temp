interface Endpoints {
  usersApiUrl: string;
  historicalApiUrl: string;
}

const endpoints: Endpoints = {
  usersApiUrl: "https://www.medly.link/v1/onfleet/users",
  historicalApiUrl: "https://tech.medly.link/v1/onfleet/capacity/getHistorical/"
};

export default endpoints;