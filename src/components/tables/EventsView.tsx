import React from "react";
import { get } from "lodash";
import { format } from "date-fns";
import eventExtractor from "../../helpers/event-extractor";
import "./EventsView.scss";

const EventsView = (props: any) => {
  const formattedEvents: Array<object> = [];
  const normalizedTask = eventExtractor(props.events);

  const actualArrivalTime = format(
    new Date(normalizedTask.actualArrivalTime),
    "MM/dd/yyyy h:mm a"
  );

  const actualCompletionTime = format(
    new Date(normalizedTask.actualCompletionTime),
    "MM/dd/yyyy h:mm a"
  );

  const estimatedArrivalTime = format(
    new Date(normalizedTask.estimatedArrivalTime),
    "MM/dd/yyyy h:mm a"
  );

  const estimatedCompletionTime = format(
    new Date(normalizedTask.estimatedCompletionTime),
    "MM/dd/yyyy h:mm a"
  );

  const deliveryTimeStatus =
  normalizedTask.completionTimeDifference === 0
      ? "On-time"
      : `Late/Early ${Math.abs(
        normalizedTask.completionTimeDifference
        )} Minutes`;
  const arrivaTimeStatus =
  normalizedTask.arrivalTimeDifference === 0
      ? "On-time"
      : `Late/Early ${Math.abs(normalizedTask.arrivalTimeDifference)} Minutes`;

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
      worker: get(event, "wkr_name", null),
      driverNotes: get(event, "doc.data.task.completionDetails.notes", ""),
      recipientsNotes: get(event, "doc.data.task.recipients[0].notes", ""),
      taskNotes: get(event, "doc.data.task.notes", "")
    };

    formattedEvents.push(formatedEvent);
  });

  return (
    <>
      <div className="event-container">
        {formattedEvents.map((event: any, index: number) => {
          return (
            <div className="event">
              <div className="event-index">
                <span>
                  <p>{index + 1} </p>
                </span>
              </div>
              <div className="event-content">
                <p className="event-title">
                  Event: {event.name}
                  {event.name === "taskFailed" && (
                    <i className="pi pi-exclamation-triangle icon icon-red"></i>
                  )}
                </p>
                <p className="event-text">
                  <i className="pi pi-clock icon-small"></i> Created:
                  {event.create_date}
                </p>

                {event.admin !== null && (
                  <p className="event-text">
                    <i className="pi pi-user icon-small"></i> Admin:
                    {event.admin}
                  </p>
                )}

                {event.worker !== null && (
                  <p className="event-text">
                    <i className="pi pi-user icon-small"></i> Worker:
                    {event.worker}
                  </p>
                )}

                {event.name === "taskArrival" && (
                  <p className="event-text">
                    <p>
                      <i className="pi pi-clock icon-small"></i> Estimated
                      Arrival Time {estimatedArrivalTime}
                    </p>
                    <p>
                      <i className="pi pi-clock icon-small"></i> Actual Arrival
                      Time {actualArrivalTime} - {arrivaTimeStatus}
                    </p>
                  </p>
                )}

                {event.name === "taskFailed" && (
                  <p className="event-text">
                    <p>
                      <i className="pi pi-clock icon-small"></i> Estimated
                      Completed Time {estimatedCompletionTime}
                    </p>
                    <p>
                      <i className="pi pi-clock icon-small"></i> Actual
                      Completed Time {actualCompletionTime} -{" "}
                      {deliveryTimeStatus}
                    </p>
                  </p>
                )}

                {event.taskNotes !== "" &&  event.name === "taskStarted" && (
                  <div className="event-text event-notes">
                    Task Notes: <br /> <span>{event.taskNotes}</span>
                  </div>
                )}

                {event.recipientsNotes !== "" &&  event.name === "taskArrival" && (
                  <div className="event-text event-notes">
                    Recipients Notes: <br />
                    <span>{event.recipientsNotes}</span>
                  </div>
                )}

                {event.name === "taskFailed" && (
                  <>
                    {event.driverNotes !== "" && (
                      <div className="event-text event-notes">
                        Driver Notes: <br /> <span>{event.driverNotes}</span>
                      </div>
                    )}
                    {event.driverNotes === "" && (
                      <div className="event-text event-notes-alert">
                        <span> DRIVER DID NOT LEAVE NOTES </span>
                      </div>
                    )}
                  </>
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
