import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Spinner from "components/base-components/Spinner";

describe("Spinner", () => {
  describe("Rendering", () => {
    it("renders spinner element", () => {
      const { container } = render(<Spinner />);
      const spinner = container.querySelector(".animate-spin");
      expect(spinner).toBeInTheDocument();
    });

    it("centers spinner on screen", () => {
      const { container } = render(<Spinner />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("flex");
      expect(wrapper).toHaveClass("items-center");
      expect(wrapper).toHaveClass("justify-center");
      expect(wrapper).toHaveClass("h-screen");
    });
  });
});
