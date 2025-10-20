import React from "react";
import { render, screen } from "@testing-library/react";
import ProgressBar from "components/base-components/ProgressBar";

describe("ProgressBar", () => {
  it("renders without crashing", () => {
    render(<ProgressBar progressPercent={50} />);
    expect(screen.getByText("Progress")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
  });
});
