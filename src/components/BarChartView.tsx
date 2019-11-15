import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

interface Props {
    zones: any;
    drivers: null | Array<string>
}

interface Zones {
    name: string;
    Completed: number;
    Ontime: number;
    Late: number;
    Failed: number;
}

const BarChartView = (props: Props) => {
    const zones = props.zones;

    const data: Array<any> = [{
        name: 'Zoneless', 
        Completed: zones.zoneless.total.completed, 
        Ontime: zones.zoneless.total.ontime, 
        Late: zones.zoneless.total.late, 
        Failed: zones.zoneless.total.failed
    }];
   
    // Build Zones
    for (let i = 1; i <= 6; i++ ) {
        let zone: string = `zone${i}`;
        let obj: Zones = {
            name: `Zone ${i}`,
            Completed: zones[zone].total.completed, 
            Ontime: zones[zone].total.ontime, 
            Late: zones[zone].total.late, 
            Failed: zones[zone].total.failed
        };

        data.push(obj);
    };

    return (
        <>
            <h1>Deliveries by Zone </h1>
            <BarChart
                width={550}
                height={350}
                data={data}
                margin={{
                top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Late" stackId="a" fill="#FFCA58" />
                <Bar dataKey="Ontime" stackId="a" fill="#00873D" />
                <Bar dataKey="Completed" stackId="a" fill="#00C781" />
                <Bar dataKey="Failed" fill="#FF4040" />
            </BarChart>
        </>
    );
};

export default BarChartView;