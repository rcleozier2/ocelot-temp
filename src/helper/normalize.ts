interface Normalize {
  drivers: Array<any>;
  tasks: {
    total: object;
    data: Array<any>;
  };
}

const normalize = (response: any) => {
  let keys = Object.keys(response.tasks);
  let res: Normalize = {
    drivers: response.drivers,
    tasks: {
      total: response.tasks.dayTotal,
      data: []
    }
  };

  keys.forEach(key => {
    if (key !== "dayTotal") {
      const data = {
        name: key,
        ...response.tasks[key]
      };
      res.tasks.data.push(data);
    }
  });

  return res;
};

export default normalize;
