import React from 'react';
import {Chart} from 'primereact/chart';

interface Options {
    height: string;
    width: string;
}

interface Props {
    tasks: any;
    drivers: null | Array<string>
}

const PieChartView = (props: Props)=> {
    const tasks = props.tasks;
    const pieData: Array<number> = [];
    const labels: Array<string> = [];
   
    // Build Task and Labels
    tasks.data.forEach((task: any) => {
        labels.push(task.name)
        pieData.push(task.total.failed);
    });

    const options: Options = {
        height: '200',
        width: '200',
    };

    const data = {
        labels,
        datasets: [
            {
                data : pieData,
                backgroundColor: [
                    "#FFAA15",
                    "#555555",
                    "#777777",
                    "#999999",
                    "#00739D",
                    "#7D4CDB",
                    "#CCCCCC"
                ],
                hoverBackgroundColor: [
                    "#FFAA15",
                    "#555555",
                    "#777777",
                    "#999999",
                    "#00739D",
                    "#7D4CDB",
                    "#CCCCCC"
                ]
            }]    
    };

    return (
        <> 
            <h1>Failures Stats </h1>
            <Chart type="pie" data={data} options={options} />
        </>
    );

};

export default PieChartView;