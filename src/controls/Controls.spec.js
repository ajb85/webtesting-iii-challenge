// Test away!
// Test away
import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, cleanup } from "react-testing-library";
import renderer from "react-test-renderer";
import "jest-dom/extend-expect";

import Controls from "./Controls.js";

afterEach(cleanup);

describe("<Controls />", () => {
  describe("Basic Functions", () => {
    let closed, locked, toggleLocked, toggleClosed, rendered;
    beforeEach(() => {
      closed = true;
      locked = false;
      toggleLocked = jest.fn(() => (locked = !locked));
      toggleClosed = jest.fn(() => (closed = !closed));

      rendered = render(
        <Controls
          locked={locked}
          closed={closed}
          toggleClosed={toggleClosed}
          toggleLocked={toggleLocked}
        />
      );
    });

    it("renders without crashing", () => {
      const div = document.createElement("div");
      ReactDOM.render(<Controls />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it("should toggle 'locked' state", () => {
      const { getByText } = rendered;
      const button = getByText(/Lock Gate/i);
      fireEvent.click(button);
      expect(locked).toEqual(true);
    });

    it("should toggle the 'closed' state", () => {
      const { getByText } = rendered;
      const button = getByText(/Open Gate/i);
      fireEvent.click(button);
      expect(closed).toEqual(false);
    });
  });
  describe("Blocked functionality", () => {
    it("should not toggle the 'locked' state when gate is open", () => {
      let closed = false;
      let locked = false;
      let toggleLocked = jest.fn(() => (locked = !locked));
      let toggleClosed = jest.fn(() => (closed = !closed));

      const { getByText } = render(
        <Controls
          locked={locked}
          closed={closed}
          toggleClosed={toggleClosed}
          toggleLocked={toggleLocked}
        />
      );
      const lockButton = getByText(/Lock Gate/i);

      fireEvent.click(lockButton);
      expect(locked).toEqual(false);
    });

    it("should not open the gate when locked", () => {
      let closed = true;
      let locked = true;
      let toggleLocked = jest.fn(() => (locked = !locked));
      let toggleClosed = jest.fn(() => (closed = !closed));

      const { getByText } = render(
        <Controls
          locked={locked}
          closed={closed}
          toggleClosed={toggleClosed}
          toggleLocked={toggleLocked}
        />
      );
      const closeButton = getByText(/Open Gate/i);

      fireEvent.click(closeButton);
      expect(closed).toEqual(true);
    });
  });
});
