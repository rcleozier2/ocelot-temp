import React from "react";
import ZoneTable from "../ZoneTable";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tasks = { data: [] };
  const drivers = { data: [] };

  const component = renderer
    .create(<ZoneTable tasks={tasks} drivers={drivers} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});
