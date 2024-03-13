class Compass {
  directions = ["N", "E", "S", "W"];
  directionIndex = 0;
}

export class MarsRoverController {
  yCoordinate = 0;
  xCoordinate = 0;
  compass = new Compass();

  execute(command: string) {
    Array.from(command).forEach((commandChar) => {
      if (this.isMoveCommand(commandChar)) {
        this.move();
        return;
      }

      if (this.isTurnLeftCommand(commandChar)) {
        this.turnLeft();
        return;
      }

      if (this.isTurnRightCommand(commandChar)) {
        this.turnRight();
      }
    });

    return `${this.xCoordinate}:${this.yCoordinate}:${
      this.compass.directions[this.compass.directionIndex]
    }`;
  }

  private isMoveCommand(commandChar: string) {
    return commandChar === "M";
  }

  private isTurnRightCommand(commandChar: string) {
    return commandChar === "R";
  }

  private isTurnLeftCommand(commandChar: string) {
    return commandChar === "L";
  }

  turnLeft() {
    this.compass.directionIndex -= 1;

    if (this.compass.directionIndex < 0) {
      this.compass.directionIndex = 3;
    }
  }

  turnRight() {
    this.compass.directionIndex += 1;

    if (this.compass.directionIndex > 3) {
      this.compass.directionIndex = 0;
    }
  }

  move() {
    if (this.directionIsNorth()) {
      this.moveNorth();
      return;
    }

    if (this.directionIsEast()) {
      this.moveEast();
      return;
    }

    if (this.directionIsSouth()) {
      this.moveSouth();
      return;
    }

    if (this.directionIsWest()) {
      this.moveWest();
      return;
    }
  }

  private directionIsNorth() {
    return this.compass.directionIndex === 0;
  }

  private directionIsEast() {
    return this.compass.directionIndex === 1;
  }

  private directionIsSouth() {
    return this.compass.directionIndex === 2;
  }

  private directionIsWest() {
    return this.compass.directionIndex === 3;
  }

  private moveNorth() {
    this.yCoordinate += 1;

    if (this.yCoordinate > 9) {
      this.yCoordinate = 0;
    }
  }

  private moveEast() {
    this.xCoordinate += 1;

    if (this.xCoordinate > 9) {
      this.xCoordinate = 0;
    }
  }

  private moveSouth() {
    this.yCoordinate -= 1;

    if (this.yCoordinate < 0) {
      this.yCoordinate = 9;
    }
  }

  private moveWest() {
    this.xCoordinate -= 1;

    if (this.xCoordinate < 0) {
      this.xCoordinate = 9;
    }
  }
}
