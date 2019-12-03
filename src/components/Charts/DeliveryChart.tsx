import React from "react";
import { Chart } from "primereact/chart";

import "./DeliveryChart.scss";

interface Options {
  height: string;
  width: string;
}

interface Props {
  tasks: any;
}

const DeliveryChart = (props: Props) => {
  const pieData: Array<number> = [
    props.tasks.total.completed,
    props.tasks.total.failed,
    props.tasks.total.justSends
  ];
  const labels: Array<string> = ["Completed", "Failed", "Just Sends"];

  const backgroundColor: Array<string> = ["#00873D", "#FF4040", "#00739D"];

  const options: Options = {
    height: "150",
    width: "150"
  };

  const data = {
    labels,
    datasets: [
      {
        data: pieData,
        backgroundColor,
        hoverBackgroundColor: backgroundColor
      }
    ]
  };

  return (
    <div style={{ width: 500 }} className="delivery-chart">
      <Chart type="pie" data={data} options={options} />
    </div>
  );
};

export default DeliveryChart;
