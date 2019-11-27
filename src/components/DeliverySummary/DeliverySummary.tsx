import React from "react";

import "./DeliverySummary.scss";

const DeliverySummary = (props: any) => {
    const completionPercentage = Math.round((props.tasks.total.completed / props.tasks.total.scheduled) * 100);
  return (
    <>
      <div className="delivery-summary">
        <div className="row">
          <div className="col-12">
            <p className="delivery-summary-stats">
              {props.tasks.total.completed} / {props.tasks.total.scheduled}
            </p>
            <p className="delivery-summary-percentage">
                {completionPercentage}% Complete
            </p>
          </div>
          <div className="col-12"> Sucessful Deliveries Today </div>
        </div>
      </div>
    </>
  );
};

export default DeliverySummary;
