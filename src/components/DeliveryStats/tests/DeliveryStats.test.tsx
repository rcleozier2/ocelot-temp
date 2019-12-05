import React from "react";
import DeliveryStats from "../DeliveryStats";
import renderer from "react-test-renderer";

it("renders DeliveryStats correctly", () => {
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

  const component = renderer.create(<DeliveryStats {...props} />).toJSON();
  expect(component).toMatchSnapshot();
});

it("renders DeliveryStats correctly with new props", () => {
  const props = {
    tasks: {
      total: {
        completedOntime: 12,
        completedLate: 13,
        completed: 15,
        failedOntime: 12,
        failedLate: 12,
        failed: 14,
        scheduled: 29,
        justSends: 4
      }
    }
  };
  const component = renderer.create(<DeliveryStats {...props} />).toJSON();
  expect(component).toMatchSnapshot();
});
