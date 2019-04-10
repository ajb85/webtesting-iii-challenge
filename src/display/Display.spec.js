// Test away!Display
import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, cleanup } from "react-testing-library";
import renderer from "react-test-renderer";
import "jest-dom/extend-expect";

import Display from "./Display.js";

afterEach(cleanup);

describe("<Display />", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Display />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("matches snapshot", () => {
    const tree = renderer.create(<Display />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("Divs have red-led className when closed/locked", () => {
    let closed, locked, rendered;
    beforeEach(() => {
      closed = true;
      locked = true;
      rendered = render(<Display locked={locked} closed={closed} />);
    });

    it("should have red-led on closed", () => {
      const { getByText } = rendered;
      const div = getByText(/closed/i);
      expect(div).toHaveClass("red-led");
    });

    it("should have red-led on locked", () => {
      const { getByText } = rendered;
      const div = getByText(/locked/i);
      expect(div).toHaveClass("red-led");
    });
  });

  describe("Divs have green-led className when open/unlocked", () => {
    let closed, locked, rendered;
    beforeEach(() => {
      closed = false;
      locked = false;
      rendered = render(<Display locked={locked} closed={closed} />);
    });

    it("should have green-led on open", () => {
      const { getByText } = rendered;
      const div = getByText(/open/i);
      expect(div).toHaveClass("green-led");
    });

    it("should have red-led on locked", () => {
      const { getByText } = rendered;
      const div = getByText(/unlocked/i);
      expect(div).toHaveClass("green-led");
    });
  });
});
