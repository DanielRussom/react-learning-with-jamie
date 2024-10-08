import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { MarsRoverController } from "./MarsRoverController";
import { Position } from "./Position";
import Mock = jest.Mock;
import { Coordinate } from "./Coordinate";
import { Compass } from "./Compass";

jest.mock("./MarsRoverController");
jest.mock("./MarsGrid", () => ({ position }: { position: Position }) => (
  <span data-testid="grid">{position.toString()}</span>
));

let executeFunction: Mock<any, any>;

const startingPosition = new Position(new Coordinate(), new Compass())

describe("App", () => {
  beforeEach(() => {
    executeFunction = jest.fn();
    executeFunction.mockReturnValue("0:0:N");
    MarsRoverController.prototype.execute = executeFunction;
  });

  it("should render grid with default starting coordinate", () => {
    render(<App />);

    const grid = screen.getByTestId("grid");

    expect(grid).toHaveTextContent("0:0:N");
  });

  it("should render grid with given coordinate", () => {
    executeFunction.mockReturnValue("5:3:E");

    render(<App />);

    clickExecuteButton();

    const grid = screen.getByTestId("grid");

    expect(grid).toHaveTextContent("5:3:E");
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
    render(<App />);

    clickExecuteButton();

    expect(executeFunction).toHaveBeenCalledTimes(1);

    expect(executeFunction).toHaveBeenCalledWith(startingPosition, "")
  });

  it("sends execute command of M to the controller", () => {
    render(<App />);

    clickMoveButton();

    clickExecuteButton();

    expect(executeFunction).toHaveBeenCalledTimes(1);
    expect(executeFunction).toHaveBeenCalledWith(startingPosition, "M");
  });

  it("sends execute command of MLLMRM to the controller", () => {
    render(<App />);

    clickMoveButton();
    clickLeftButton(2);
    clickMoveButton();
    clickRightButton();
    clickMoveButton();

    clickExecuteButton();

    expect(executeFunction).toHaveBeenCalledTimes(1);
    expect(executeFunction).toHaveBeenCalledWith(startingPosition, "MLLMRM");
  });

  it("clear after executing command", () => {
    render(<App />);

    clickMoveButton();
    clickExecuteButton();

    assertCommandIs("");
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

  function clickExecuteButton() {
    const button = screen.getByRole("button", { name: "Execute" });
    clickButton(button, 1);
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
