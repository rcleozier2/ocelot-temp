import React from "react";

import "./DeliveryStats.scss";

const DeliveryStats = (props: any) => {
  return (
    <>
      <div className="delivery-stats">
        <div className="row">
          <div className="col-12">
            <p className="delivery-stats-text">
              Completed On Time ({props.tasks.total.completedOntime})
            </p>
            <p className="delivery-stats-text">
              Completed Late ({props.tasks.total.completedLate})
            </p>
            <p className="delivery-stats-text">
              Total Completed ({props.tasks.total.completed})
            </p>
            <hr />
            <p className="delivery-stats-text">
              Failed On Time ({props.tasks.total.failedOntime})
            </p>
            <p className="delivery-stats-text">
              Failed Late ({props.tasks.total.failedLate})
            </p>

            <p className="delivery-stats-text">
              Total Failed ({props.tasks.total.failed})
            </p>
            <hr />

            <p className="delivery-stats-text">
              Total Scheduled ({props.tasks.total.scheduled})
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryStats;
