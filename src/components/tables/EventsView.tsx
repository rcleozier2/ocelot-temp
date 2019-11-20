import React from "react";
import { Row } from "primereact/row";
import { get } from "lodash";
import { format } from "date-fns";

import eventExtractor from "../../helper/event-extractor";

import "./EventsView.scss";

function diffEvents(event1: object, event: object) {
  let diff = "";

  return diff;
}

const EventsView = (props: any) => {
  const formatedEvents: Array<object> = [];
  const normalizedEvent = eventExtractor(props.events);

  const actualArrivalTime = format(
    new Date(normalizedEvent.actualArrivalTime),
    "MM/dd/yyyy h:mm a"
  );

  const actualCompletionTime = format(
    new Date(normalizedEvent.actualCompletionTime),
    "MM/dd/yyyy h:mm a"
  );

  const deliveryTimeStatus = (normalizedEvent.completionTimeDifference == 0 ? "On-time" : "Late/Early");
  const arrivaTimeStatus = (normalizedEvent.arrivalTimeDifference == 0 ? "On-time" : "Late/Early");
  const completionTimeDifference = normalizedEvent.completionTimeDifference

  // Build Row Data
  props.events.forEach((event: any, index: number) => {
    const name = get(event, "doc.triggerName", "");
    let diff = "";

    if (name === "taskUpdated") {
      diff = diffEvents(event, event[index - 1]);
    }

    let obj = {
      index: index + 1,
      name,
      create_date: format(
        new Date(get(event, "created", "")),
        "MM/dd/yyyy h:mm a"
      ),
      completion_date: format(
        new Date(get(event, "doc.data.task.timeLastModified", "")),
        "MM/dd/yyyy h:mm a"
      ),
      admin: get(event, "adm_name", ""),
      worker: get(event, "wkr_name", ""),
      driverNotes: get(event, "doc.data.task.completionDetails.notes", ""),
      recipientsNotes: get(event, "doc.data.task.recipients[0].notes", ""),
      taskNotes: get(event, "doc.data.task.notes", ""),
      diff
    };

    formatedEvents.push(obj);
  });

  return (
    <>
      <div className="event-container">
        {formatedEvents.map((event: any, index: number) => {
          return (
            <div className="event">
              <div className="event-index">
                {" "}
                <span>
                  <p>{event.index} </p>{" "}
                </span>
              </div>
              <div className="event-content">
                <p className="event-title">
                  Event: {event.name}
                  {event.name == "taskFailed" && (
                    <i className="pi pi-exclamation-triangle icon icon-red"></i>
                  )}
                </p>
                <p className="event-text">
                  {" "}
                  <i className="pi pi-clock icon-small"></i> Created:{" "}
                  {event.create_date}{" "}
                </p>

                {event.admin != "" && (
                  <p className="event-text">
                    {" "}
                    <i className="pi pi-user icon-small"></i> Admin:{" "}
                    {event.admin}{" "}
                  </p>
                )}

                {event.worker != "" && (
                  <p className="event-text">
                    {" "}
                    <i className="pi pi-user icon-small"></i> Worker:{" "}
                    {event.worker}{" "}
                  </p>
                )}

                {event.name == "taskArrival" && (
                  <p className="event-text">
                    <p>
                      {" "}
                      <i className="pi pi-clock icon-small"></i> Actual Arrival
                      Time {actualArrivalTime} - {arrivaTimeStatus}
                    </p>

                  
                  </p>
                )}

                {event.name == "taskFailed" && (
                  <p className="event-text">
                    <p>
                      {" "}
                      <i className="pi pi-clock icon-small"></i> Actual
                      Completed Time {actualCompletionTime} - {deliveryTimeStatus}
                    </p>
                  </p>
                )}

                {event.taskNotes != "" && (
                  <div className="event-text event-notes">
                    Task Notes: <br /> <span>{event.taskNotes}</span>{" "}
                  </div>
                )}

                {event.recipientsNotes != "" && (
                  <div className="event-text event-notes">
                    Recipients Notes: <br />{" "}
                    <span>{event.recipientsNotes}</span>{" "}
                  </div>
                )}

                {event.driverNotes != "" && (
                  <div className="event-text event-notes">
                    Driver Notes: <br /> <span>{event.driverNotes}</span>{" "}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EventsView;
