import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("mars rover feature", () => {
  it("moves and turns", () => {
    render(<App />);

    let moveButton = screen.getByRole("button", { name: "Move" });
    let turnRightButton = screen.getByRole("button", { name: "Right" });
    let turnLeftButton = screen.getByRole("button", { name: "Left" });

    // Move forwards    0,1
    userEvent.click(moveButton);
    // Move forwards    0,2
    userEvent.click(moveButton);
    // Turn right       0,2
    userEvent.click(turnRightButton);
    // Move forwards    1,2
    userEvent.click(moveButton);
    // Turn left        1,2
    userEvent.click(turnLeftButton);
    // Move forwards    1,3
    userEvent.click(moveButton);
    // 1,3 ^

    // Assert on the position.
    const squareAt1_3 = screen.getByLabelText("square at x1 y3");

    expect(squareAt1_3).toHaveTextContent("^");
  });
});
