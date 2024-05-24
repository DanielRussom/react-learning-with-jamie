import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { MarsRoverController } from "./MarsRoverController";
import { Position } from "./Position";

jest.mock("./MarsRoverController");
jest.mock("./MarsGrid", () => ({ position }: { position: Position }) => (
  <span data-testid="grid">{position.toString()}</span>
));

describe("App", () => {
  it("should render grid with default starting coordinate", () => {
    render(<App />);

    const grid = screen.getByTestId("grid");

    expect(grid).toHaveTextContent("0:0:N");
  });

  it("Renders a grid", () => {
    render(<App />);

    const grid = screen.getByTestId("grid");

    expect(grid).toBeInTheDocument();
  });

  it("Starts with an empty command list", () => {
    render(<App />);

    const commandString = screen.getByLabelText("Command:");

    expect(commandString).toHaveValue("");
    expect(commandString).toBeDisabled();
  });

  it.each([
    [1, "M"],
    [2, "MM"],
    [5, "MMMMM"],
  ])(
    "Adds M to the command when we click Move",
    async (clickCount, expectedCommand) => {
      render(<App />);

      clickMoveButton(clickCount);

      assertCommandIs(expectedCommand);
    }
  );

  it.each([
    [1, "R"],
    [2, "RR"],
    [5, "RRRRR"],
  ])(
    "Adds R to the command when we click Right",
    async (clickCount, expectedCommand) => {
      render(<App />);

      clickRightButton(clickCount);

      assertCommandIs(expectedCommand);
    }
  );

  it.each([
    [1, "L"],
    [2, "LL"],
    [5, "LLLLL"],
  ])(
    "Adds L to the command when we click Left",
    async (clickCount, expectedCommand) => {
      render(<App />);

      clickLeftButton(clickCount);

      assertCommandIs(expectedCommand);
    }
  );

  it("sends an empty execute command to the controller", () => {
    const executeFunction = jest.fn();
    MarsRoverController.prototype.execute = executeFunction;

    render(<App />);

    clickExecuteButton();

    expect(executeFunction).toHaveBeenCalledTimes(1);
    expect(executeFunction).toHaveBeenCalledWith("");
  });

  it("sends execute command of M to the controller", () => {
    const executeFunction = jest.fn();
    MarsRoverController.prototype.execute = executeFunction;

    render(<App />);

    clickMoveButton();

    clickExecuteButton();

    expect(executeFunction).toHaveBeenCalledTimes(1);
    expect(executeFunction).toHaveBeenCalledWith("M");
  });

  it("sends execute command of MLLMRM to the controller", () => {
    const executeFunction = jest.fn();
    MarsRoverController.prototype.execute = executeFunction;

    render(<App />);

    clickMoveButton();
    clickLeftButton(2);
    clickMoveButton();
    clickRightButton();
    clickMoveButton();

    clickExecuteButton();

    expect(executeFunction).toHaveBeenCalledTimes(1);
    expect(executeFunction).toHaveBeenCalledWith("MLLMRM");
  });

  function clickMoveButton(clickCount: number = 1) {
    const button = screen.getByRole("button", { name: "Move" });
    clickButton(button, clickCount);
  }

  function clickLeftButton(clickCount: number = 1) {
    const button = screen.getByRole("button", { name: "Left" });
    clickButton(button, clickCount);
  }

  function clickRightButton(clickCount: number = 1) {
    const button = screen.getByRole("button", { name: "Right" });
    clickButton(button, clickCount);
  }

  function clickExecuteButton(clickCount: number = 1) {
    const button = screen.getByRole("button", { name: "Execute" });
    clickButton(button, clickCount);
  }

  function clickButton(button: HTMLElement, clickCount: number = 1) {
    for (let i = 0; i < clickCount; i++) {
      fireEvent.click(button);
    }
  }

  function assertCommandIs(expectedCommand: string) {
    const commandString = screen.getByLabelText("Command:");
    expect(commandString).toHaveValue(expectedCommand);
  }
});
