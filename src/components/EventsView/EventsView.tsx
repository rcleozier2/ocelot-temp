import React from "react";
import { get } from "lodash";
import { format } from "date-fns";
import eventExtractor from "../../helpers/event-extractor";
import "./scss/EventsView.scss";

const EventsView = (props: any) => {
  const formattedEvents: Array<object> = [];
  const normalizedTask = eventExtractor(props.events);

  const actualArrivalTime = format(
    new Date(normalizedTask.times.actualArrivalTime),
    "MM/dd/yyyy h:mm a"
  );

  const actualCompletionTime = format(
    new Date(normalizedTask.times.actualCompletionTime),
    "MM/dd/yyyy h:mm a"
  );

  const estimatedArrivalTime = format(
    new Date(normalizedTask.times.estimatedArrivalTime),
    "MM/dd/yyyy h:mm a"
  );

  const estimatedCompletionTime = format(
    new Date(normalizedTask.times.estimatedCompletionTime),
    "MM/dd/yyyy h:mm a"
  );

  // Build Row Data
  props.events.forEach((event: any, index: number) => {
    const name = get(event, "doc.triggerName", "");

    let formatedEvent = {
      name,
      create_date: format(
        new Date(get(event, "created", "")),
        "MM/dd/yyyy h:mm a"
      ),
      completion_date: format(
        new Date(get(event, "doc.data.task.timeLastModified", "")),
        "MM/dd/yyyy h:mm a"
      ),
      admin: get(event, "adm_name", null),
      worker: get(event, "wkr_name", null)
    };

    formattedEvents.push(formatedEvent);
  });

  return (
    <>
      <div className="main-container">
        <div className="summary-container">
          <p className="summary-container-title">
            {normalizedTask.failed === true && (
              <span>
                <i className="pi pi-exclamation-triangle icon icon-red"></i>
                Failed
              </span>
            )}
          </p>

          <p className="summary-text m-0">
            <i className="pi pi-directions icon-small"></i>{" "}
            <span>Driver: </span>
            {normalizedTask.driver}
          </p>

          <p className="summary-text m-0">
            <i className="pi pi-user icon-small"></i> <span>Admin: </span>
            {normalizedTask.admin}
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
            <p className="summary-notes-time m-0">
              {normalizedTask.times.arrivalStatus} by{" "}
              {normalizedTask.times.arrivalTimeDifference} Minutes{" "}
            </p>
          )}

          <hr />

          <p className="summary-text m-0">
            <i className="pi pi-clock icon-small"></i>{" "}
            <span>Estimated Completed Time: </span>
            {estimatedCompletionTime}
          </p>

          <p className="summary-text m-0">
            <i className="pi pi-clock icon-small"></i>{" "}
            <span>Actual Completed Time:</span>
            {actualCompletionTime}
          </p>

          {normalizedTask.times.completedStatus !== "ontime" && (
            <p className="summary-notes-time m-0">
              {normalizedTask.times.completedStatus} by{" "}
              {normalizedTask.times.completionTimeDifference} Minutes{" "}
            </p>
          )}
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
              <span className="className">
                {normalizedTask.notes.recipients}
              </span>
            </div>
          )}

          {normalizedTask.notes.driver !== "" && (
            <div className="summary-notes">
              <p>Driver Notes: </p>
              <span> {normalizedTask.notes.driver}</span>
            </div>
          )}
        </div>
        <div className="event-container">
          {formattedEvents.map((event: any, index: number) => {
            return (
              <div className="event" key={index}>
                <div className="event-index">
                  <span>
                    <p>{index + 1} </p>
                  </span>
                </div>
                <div className="event-content">
                  <p className="event-title">
                    {event.name}
                    {event.name === "taskFailed" && (
                      <i className="pi pi-exclamation-triangle icon icon-red"></i>
                    )}
                  </p>
                  <p className="event-text">
                    <i className="pi pi-clock icon-small"></i> Created:
                    {event.create_date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default EventsView;
