import React from "react";
import EventDetails from "../EventDetails";
import renderer from "react-test-renderer";

xit("renders EventDetails correctly for completed task", () => {
  const props = {
    normalizedTask : {
        times : {
            actualArrivalTime: 1575574061,
            actualCompletionTime: 1575574062,
            estimatedArrivalTime: 1575574063,
            completeAfter: 1575574061,
            completeBefore: 1575574062,
            completedStatus: true,
            completionTimeDifference: 23,
            arrivalStatus: true,
            arrivalTimeDifference: 10

        },
        failed: false,
        completed: true,
        driver: "Driver 1",
        admin: "Medly Admin",
        recipients: [{
            name: "Name",
            phone: "+212-122-2232"
        }],
        address:{
            number : 1,
            street: "110 Street",
            city: "Brooklyn",
            state: "New York",
            postalCode: "11101"
        },
        notes: {
            task: "task notes",
            recipients: "recipients note",
            driver: "driver notes"

        },
        attachments: []
    }
  };

  const component = renderer.create(<EventDetails {...props} />).toJSON();
  expect(component).toMatchSnapshot();
});

xit("renders EventDetails correctly for failed task", () => {
    const props = {
      normalizedTask : {
          times : {
              actualArrivalTime: 1575574061,
              actualCompletionTime: 1575574062,
              estimatedArrivalTime: 1575574063,
              completeAfter: 1575574061,
              completeBefore: 1575574062,
              completedStatus: true,
              completionTimeDifference: 23,
              arrivalStatus: true,
              arrivalTimeDifference: 10
  
          },
          failed: true,
          completed: false,
          driver: "Driver 2",
          admin: "Medly Admin",
          recipients: [{
              name: "Name",
              phone: "+212-122-2232"
          }],
          address:{
              number : 1,
              street: "115 Street",
              city: "Brooklyn",
              state: "New York",
              postalCode: "11100"
          },
          notes: {
              task: "task notes",
              recipients: "recipients note",
              driver: "driver notes"
  
          },
          attachments: []
      }
    };
  
    const component = renderer.create(<EventDetails {...props} />).toJSON();
    expect(component).toMatchSnapshot();
  });
