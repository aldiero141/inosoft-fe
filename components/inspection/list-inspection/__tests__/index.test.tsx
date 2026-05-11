/* eslint-disable react/display-name */
import React from "react";
import { render, screen } from "@testing-library/react";
import ListInspection from "../index";

// Mock all direct children so this test only validates composition
jest.mock("../header-inspection", () => () => (
  <div data-testid="header-inspection" />
));

jest.mock("../tab-inspection", () => () => (
  <div data-testid="tab-inspection" />
));

jest.mock("../table-inspection", () => () => (
  <div data-testid="table-inspection" />
));

describe("ListInspection (index)", () => {
  it("renders HeaderInspection", () => {
    render(<ListInspection />);
    expect(screen.getByTestId("header-inspection")).toBeInTheDocument();
  });

  it("renders TabInspection", () => {
    render(<ListInspection />);
    expect(screen.getByTestId("tab-inspection")).toBeInTheDocument();
  });

  it("renders TableInspection", () => {
    render(<ListInspection />);
    expect(screen.getByTestId("table-inspection")).toBeInTheDocument();
  });

  it("renders all three child components together", () => {
    render(<ListInspection />);
    expect(screen.getByTestId("header-inspection")).toBeInTheDocument();
    expect(screen.getByTestId("tab-inspection")).toBeInTheDocument();
    expect(screen.getByTestId("table-inspection")).toBeInTheDocument();
  });
});
