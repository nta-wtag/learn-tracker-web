import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Book } from "lucide-react";
import StatItem from "components/base-components/StatItem";

describe("StatItem", () => {
  describe("Rendering", () => {
    it("renders label", () => {
      render(<StatItem icon={Book} label="10 lessons" />);
      expect(screen.getByText("10 lessons")).toBeInTheDocument();
    });

    it("renders icon", () => {
      const { container } = render(<StatItem icon={Book} label="10 lessons" />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });
});
