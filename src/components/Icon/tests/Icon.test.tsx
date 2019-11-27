import React from "react";
import Icon from "../Icon";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const props = {
      icon: "pi pi-thumbs-up"
  }
  const component = renderer
    .create(<Icon  {...props} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it("renders correctly with different icon", () => {
    const props = {
        icon: "pi pi-thumbs-down"
    }
    const component = renderer
      .create(<Icon  {...props} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
  