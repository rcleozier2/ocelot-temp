import React from "react";
import { Assigned, Complete, Scheduled, Failed, JustSend } from "../TableIcons";

import renderer from "react-test-renderer";

const props = {
  data: {
    scheduled: 1,
    completed: 2,
    completedLate: 3,
    failed: 2,
    failedLate: 2,
    justSends: 5
  }
};

it("renders correctly", () => {
  const component = renderer.create(<Assigned {...props} />).toJSON();
  expect(component).toMatchSnapshot();
});

it("renders correctly", () => {
  const component = renderer.create(<Complete {...props} />).toJSON();
  expect(component).toMatchSnapshot();
});

it("renders correctly", () => {
  const component = renderer.create(<Scheduled {...props} />).toJSON();
  expect(component).toMatchSnapshot();
});

it("renders correctly", () => {
  const component = renderer.create(<Failed {...props} />).toJSON();
  expect(component).toMatchSnapshot();
});

it("renders correctly", () => {
  const component = renderer.create(<JustSend {...props} />).toJSON();
  expect(component).toMatchSnapshot();
});
