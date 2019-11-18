import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

interface Props {
    tasks: any;
    drivers: null | Array<string>;
}

interface Zones {
    name: string;
    Completed: number;
    Ontime: number;
    Late: number;
    Failed: number;
}

const BarChartView = (props: Props) => {
    const tasks = props.tasks;
    const data: Array<any> = [];
   
    // Build Tasks
    tasks.data.forEach((task: any) => {
        let obj: Zones = {
            name: task.name,
            Completed: task.total.completed, 
            Ontime: task.total.completedOntime, 
            Late: task.total.completedLate, 
            Failed: task.total.failed
        };

        data.push(obj);
    });

    return (
        <>
            <h1>Deliveries Stats </h1>
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