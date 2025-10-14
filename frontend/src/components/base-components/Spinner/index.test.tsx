import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Spinner from "."; 

describe("Spinner Component", () => {
  it("renders a container div with full screen height and centered content", () => {
    const { container } = render(<Spinner />);
    const outerDiv = container.firstChild as HTMLElement;

    expect(outerDiv).toBeInTheDocument();
  });

  it("renders the inner spinning div", () => {
    const { container } = render(<Spinner />);
    const spinnerDiv = container.querySelector("div > div");

    expect(spinnerDiv).toBeInTheDocument();
  });
});
