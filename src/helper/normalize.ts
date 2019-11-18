interface NormalizeResponse {
    drivers: Array<any>;
    tasks: {
        total: object,
        data: Array<any>
    }
};
  
const normalizeResponse = (response: any) => {
    let keys = Object.keys(response.tasks);
    let normalizedResponse: NormalizeResponse = {
        drivers: response.drivers,
        tasks: {
            total: response.tasks.dayTotal,
            data : []
        }
    };

    if (keys.indexOf("zone1") > 0) {
        keys.forEach( key => {
            if (key !== "dayTotal") {
                const data = {
                    name: key,
                    ...response.tasks[key]
                };
            normalizedResponse.tasks.data.push(data);
            }
        });
    } else {
        const data = {
            name: "zone",
            total: response.tasks.dayTotal,
            ...response.tasks
        };

        normalizedResponse.tasks.data.push(data);
    }

    console.log("zxzxzxzx", normalizedResponse.tasks);

    return normalizedResponse;
};

export default normalizeResponse;
