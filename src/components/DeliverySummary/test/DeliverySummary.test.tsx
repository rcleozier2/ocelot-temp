import React from "react";
import DeliverySummary from "../DeliverySummary";
import renderer from "react-test-renderer";

it("renders DeliverySummary correctly", () => {
  const props = {
    tasks: {
      total: {
        completedOntime: 2,
        completedLate: 3,
        completed: 5,
        failedOntime: 2,
        failedLate: 2,
        failed: 4,
        scheduled: 9,
        justSends: 4
      }
    }
  };

  const component = renderer.create(<DeliverySummary {...props} />).toJSON();
  expect(component).toMatchSnapshot();
});
