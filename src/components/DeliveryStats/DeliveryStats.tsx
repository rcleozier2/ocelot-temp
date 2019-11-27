import React from "react";

import "./DeliveryStats.scss";

const DeliveryStats = (props: any) => {
  return (
    <>
      <div className="delivery-stats">
        <div className="row">
          <div className="col-12">
            <p className="delivery-stats-text">
              Completed On Time ({props.tasks.total.completedOntime}) <br />
              Completed Late ({props.tasks.total.completedLate})
              <br />
              Total Completed ({props.tasks.total.completed})
              <br />
              <hr />
               Failed On Time ({props.tasks.total.failedOntime})
              <br />
              Failed Late ({props.tasks.total.failedLate})
              <br />
              Total  Failed ({props.tasks.total.failed})
            
              <hr />
              Total Scheduled ( {props.tasks.total.scheduled})
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryStats;
