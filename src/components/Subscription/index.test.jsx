import React from "react";
// eslint-disable-next-line import/no-unresolved
import renderer from "react-test-renderer";
import Subscription from ".";

it("renders correctly", () => {
  const tree = renderer.create(<Subscription />).toJSON();
  expect(tree).toMatchSnapshot();
});
