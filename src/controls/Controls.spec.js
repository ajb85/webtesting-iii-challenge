// Test away!
// Test away
import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "react-testing-library";
import renderer from "react-test-renderer";
import "jest-dom/extend-expect";

import Controls from "./Controls.js";

describe("<Controls />", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Controls />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe("Toggle Lock Button", () => {
    it("should toggle 'locked' state", () => {
      let closed = true;
      let locked = false;
      const toggleLocked = jest.fn(() => (locked = !locked));
      const { getByText } = render(
        <Controls lock={locked} closed={closed} toggleLocked={toggleLocked} />
      );

      const button = getByText(/Lock Gate/i);
      fireEvent.click(button);

      expect(locked).toEqual(true);
    });
  });

  describe("Toggle Closed Button", () => {
    it("", () => {});
  });
});
