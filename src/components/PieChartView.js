import React from 'react';
import {Chart} from 'primereact/chart';

const PieChartView = (props) => {
    const zones = props.zones;
    const pieData = [zones.zoneless.total.failed];
   
    // Build Zones
    for (let i = 1; i <= 6; i++ ) {
        let zone = `zone${i}`;
        pieData.push(zones[zone].total.failed);
    };

    const options = {
        height: '200',
        width: '200',
    };

    const data = {
        labels: ['Zoneless','Zone 1','Zone 2', 'Zone 3', 'Zone 4', 'Zone 5', 'Zone 6'],
        datasets: [
            {
                data: pieData,
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
            <h1>Failures By Zone </h1>
            <Chart type="pie" data={data} options={options} />
        </>
    );

};

export default PieChartView;