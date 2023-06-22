import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  getByAltText,
  getByPlaceholderText,
  prettyDOM,
} from "@testing-library/react";

import axios from "axios";
import Application from "../Application";

jest.mock("axios");

describe("Application", () => {
  it("loads data, books an interview, and reduces the spots remaining for the first day by 1", async () => {
    const { container, getByText, getByTestId } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    console.log(prettyDOM(container));

    const appointment = getByTestId("appointment");

    console.log(prettyDOM(appointment));

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    console.log(prettyDOM(appointment));
  });

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data from the scheduler", async () => {
    const data = [
      { id: 1, name: "Task 1", completed: false },
      { id: 2, name: "Task 2", completed: true },
    ];
    axios.get.mockResolvedValueOnce({ data });

    const { getByText } = render(<Application />);

    await waitForElement(() => {
      expect(getByText("Task 1")).toBeInTheDocument();
      expect(getByText("Task 2")).toBeInTheDocument();
    });
  });
});
