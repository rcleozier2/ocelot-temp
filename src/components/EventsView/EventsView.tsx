import React from "react";
import { get } from "lodash";
import { format } from "date-fns";
import eventExtractor from "../../helpers/event-extractor";
import EventDetails from "../EventDetails/EventDetails";

import "./EventsView.scss";

const EventsView = (props: any) => {
  const formattedEvents: Array<object> = [];
  const normalizedTask = eventExtractor(props.events);

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
          <EventDetails normalizedTask={normalizedTask} />
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
                  {event.name === "taskAssigned" && (
                    <>
                      <p>
                        <b> Assigned By </b>
                        {event.admin}
                      </p>
                      <p>
                        <b> Assigned To </b>
                        {event.worker}
                      </p>
                    </>
                  )}
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
