import React from "react";
import ZoneTableRealTime from "../ZoneTableRealTime";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tasks = { data: [] };
  const drivers = { data: [] };

  const component = renderer
    .create(<ZoneTableRealTime tasks={tasks} drivers={drivers} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});
