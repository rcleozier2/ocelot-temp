interface Normalize {
  drivers: Array<any>;
  tasks: {
    total: object;
    data: Array<any>;
  };
}

const normalize = (response: any) => {
  let keys = Object.keys(response.taskData);
  let res: Normalize = {
    drivers: response.driverData,
    tasks: {
      total: response.taskData.dayTotal,
      data: []
    }
  };

  keys.forEach(key => {
    if (key !== "dayTotal") {
      const data = {
        name: key,
        ...response.taskData[key]
      };
      res.tasks.data.push(data);
    }
  });

  return res;
};

export default normalize;
