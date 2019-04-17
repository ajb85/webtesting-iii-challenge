// Test away
import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import "jest-dom/extend-expect";

import Dashboard from "./Dashboard.js";

describe("<Dashboard />", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Dashboard />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("matches snapshot", () => {
    const tree = renderer.create(<Dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
