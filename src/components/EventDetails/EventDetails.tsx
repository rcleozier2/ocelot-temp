import React from "react";
import { isNull } from "lodash";
import { format } from "date-fns";
import "./EventDetails.scss";

const EventDetails = (props: any) => {
  const normalizedTask = props.normalizedTask;

  const actualArrivalTime = !isNull(normalizedTask.times.actualArrivalTime)
    ? format(
        new Date(normalizedTask.times.actualArrivalTime),
        "MM/dd/yyyy h:mm a"
      )
    : "Not Set";

  const actualCompletionTime = !isNull(
    normalizedTask.times.actualCompletionTime
  )
    ? format(
        new Date(normalizedTask.times.actualCompletionTime),
        "MM/dd/yyyy h:mm a"
      )
    : "Not Set";

  const estimatedArrivalTime = !isNull(
    normalizedTask.times.estimatedArrivalTime
  )
    ? format(
        new Date(normalizedTask.times.estimatedArrivalTime),
        "MM/dd/yyyy h:mm a"
      )
    : "Not Set";

  const completeAfter = !isNull(normalizedTask.times.completeAfter)
    ? format(new Date(normalizedTask.times.completeAfter), "MM/dd/yyyy h:mm a")
    : "Not Set";

  const completeBefore = !isNull(normalizedTask.times.completeBefore)
    ? format(new Date(normalizedTask.times.completeBefore), "MM/dd/yyyy h:mm a")
    : "Not Set";

  return (
    <>
      <p className="summary-container-title">
        {normalizedTask.failed === true && (
          <span>
            <i className="pi pi-exclamation-triangle icon icon-red"></i>
            Failed
          </span>
        )}
      </p>

      <p className="summary-text m-0">
        <i className="pi pi-directions icon-small"></i> <span>Driver: </span>
        {normalizedTask.driver}
      </p>

      <p className="summary-text m-0">
        <i className="pi pi-user icon-small"></i> <span>Admin: </span>
        {normalizedTask.admin}
      </p>

      <hr />
      <p className="summary-text m-0">
        {normalizedTask.recipients[0].name} <br />
        {normalizedTask.address.number} {normalizedTask.address.street} <br />
        {normalizedTask.address.city}, {normalizedTask.address.state}{" "}
        {normalizedTask.address.postalCode} <br />
        {normalizedTask.recipients[0].phone} <br />
      </p>

      {/* <p className="summary-text m-0">
            <span>Total time to completion:</span>
            {normalizedTask.times.totalTime}
          </p> */}

      <hr />
      <p className="summary-text m-0">
        <i className="pi pi-clock icon-small"></i> <span>Delivery Window </span>
        {completeAfter} - {completeBefore}
        {normalizedTask.times.completedStatus !== "ontime" && (
          <p className="summary-notes-time m-0">
            {normalizedTask.times.completedStatus} by{" "}
            {normalizedTask.times.completionTimeDifference} Minutes{" "}
          </p>
        )}
      </p>
      <hr />

      <p className="summary-text m-0">
        <i className="pi pi-clock icon-small"></i>{" "}
        <span>Estimated Arrival Time:</span>
        {estimatedArrivalTime}
      </p>

      <p className="summary-text m-0">
        <i className="pi pi-clock icon-small"></i>{" "}
        <span>Actual Arrival Time:</span>
        {actualArrivalTime}
      </p>

      {normalizedTask.times.arrivalStatus !== "ontime" && (
        <p className="summary-notes-notice m-0">
          {normalizedTask.times.arrivalStatus} by Onfleets estimate by{" "}
          {normalizedTask.times.arrivalTimeDifference} Minutes{" "}
        </p>
      )}

      <hr />

      <p className="summary-text m-0">
        <i className="pi pi-clock icon-small"></i>{" "}
        <span>Actual Completed Time:</span>
        {actualCompletionTime}
      </p>

      <hr />

      {normalizedTask.notes.task !== "" && (
        <div className="summary-notes">
          <p>Task Notes:</p>
          <span className="className">{normalizedTask.notes.task}</span>
        </div>
      )}

      {normalizedTask.notes.recipients !== "" && (
        <div className="summary-notes">
          <p>Recipient Notes:</p>
          <span className="className">{normalizedTask.notes.recipients}</span>
        </div>
      )}

      {normalizedTask.notes.driver !== "" && (
        <div className="summary-notes">
          <p>Driver Notes: </p>
          <span> {normalizedTask.notes.driver}</span>
        </div>
      )}
    </>
  );
};

export default EventDetails;
