import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "components/base-components/Button";

describe("Button", () => {
    describe("Rendering", () => {
        it("renders button with text", () => {
            render(<Button text="Click me" data-testid="main-button" />);
            expect(screen.getByTestId("main-button")).toBeInTheDocument();
        });

        it("renders with icon", () => {
            const icon = <span data-testid="test-icon">🚀</span>;
            render(<Button text="Submit" icon={icon} />);

            expect(screen.getByTestId("test-icon")).toBeInTheDocument();
            expect(screen.getByText("Submit")).toBeInTheDocument();
        });

        it("has default type of button", () => {
            render(<Button text="Test" />);
            expect(screen.getByTestId("main-button")).toHaveAttribute("type", "button");
        });

        it("can have submit type", () => {
            render(<Button text="Submit" type="submit" />);
            expect(screen.getByTestId("main-button")).toHaveAttribute("type", "submit");
        });

        it("can have reset type", () => {
            render(<Button text="Reset" type="reset" />);
            expect(screen.getByTestId("main-button")).toHaveAttribute("type", "reset");
        });
    });

    describe("Interactions", () => {
        it("calls onClick when clicked", async () => {
            const handleClick = vi.fn();
            render(<Button text="Click" onClick={handleClick} />);

            await userEvent.click(screen.getByTestId("main-button"));
            expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it("does not call onClick when disabled", async () => {
            const handleClick = vi.fn();
            render(<Button text="Click" onClick={handleClick} disabled />);

            await userEvent.click(screen.getByTestId("main-button"));
            expect(handleClick).not.toHaveBeenCalled();
        });

        it("can be clicked multiple times", async () => {
            const handleClick = vi.fn();
            render(<Button text="Click" onClick={handleClick} />);

            const button = screen.getByTestId("main-button");
            await userEvent.click(button);
            await userEvent.click(button);
            await userEvent.click(button);

            expect(handleClick).toHaveBeenCalledTimes(3);
        });
    });

    describe("Icon Placement", () => {
        it("renders icon before text", () => {
            const icon = <span data-testid="icon">→</span>;
            const { container } = render(<Button text="Next" icon={icon} />);

            const button = container.querySelector("button");
            const iconElement = screen.getByTestId("icon");
            const textNode = Array.from(button!.childNodes).find(
                (node) => node.nodeType === Node.TEXT_NODE && node.textContent === "Next"
            );

            expect(button!.childNodes[0]).toContain(iconElement);
        });
    });
});
