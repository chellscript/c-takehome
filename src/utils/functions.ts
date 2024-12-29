import { Dispatch, SetStateAction } from "react";
import { Log, Robot } from "../../types";
import { Command, DetailMessages, ExecutionStatus } from "./commands";
import { GRID_COLS, GRID_ROWS } from "./constants";

const delay = (ms: number = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const parseInstructions = (commands: string) =>
  commands.toUpperCase().split("");

export const processInstructions = async (
  commands: Command | string[],
  setLog: React.Dispatch<React.SetStateAction<Log[]>>,
  setRobot: Dispatch<SetStateAction<Robot>>,
) => {
  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    let log: Log = {
      command,
      detail: "",
      executed: ExecutionStatus.False,
    };

    switch (command) {
      case Command.Forward:
        setRobot((prev) => {
          const { detail, execution, newCoords, newGridPos } = moveRobotForward(
            command,
            prev,
          );
          log.detail = detail;
          log.executed = execution;
          return {
            ...prev,
            coords: newCoords,
            positionStyle: {
              ...prev.positionStyle,
              ...newGridPos,
            },
          };
        });
        break;
      case Command.Left:
      case Command.Right:
        setRobot((prev) => {
          const newRotation = rotateRobot(command, prev.rotation);
          log.detail = DetailMessages[command];
          log.executed = ExecutionStatus.True;
          return {
            ...prev,
            rotation: newRotation,
            positionStyle: {
              ...prev.positionStyle,
              transform: `rotate(${newRotation}deg)`,
            },
          };
        });
        break;

      default:
        log.detail = DetailMessages["unknown"];
        log.executed = ExecutionStatus.False;
        break;
    }

    setLog((prev: Log[]) => [...prev, log]);
    await delay();
  }

  setLog((prev: Log[]) => [
    ...prev,
    {
      command: 'complete',
      detail: DetailMessages['complete'],
      executed: ExecutionStatus.Complete,
    },
  ]);
};


const moveRobotForward = (command: Command, robot: Robot) => {
  const { rotation, coords, positionStyle } = robot;

  let results = {
    detail: DetailMessages[command],
    newCoords: [...coords] as [number, number],
    execution: ExecutionStatus.False,
    newGridPos: {
      gridColumnStart: positionStyle.gridColumnStart,
      gridRowStart: positionStyle.gridRowStart,
    },
  };

  const [row, col] = coords;

  const rowValues = [0, 180];
  const colValues = [90, 270];
  const moveAmount = rotation === 0 || rotation === 90 ? 1 : -1;

  if (rowValues.includes(rotation)) {
    let newValue = row + moveAmount;
    if (newValue < 0 || newValue >= GRID_ROWS) {
      results.detail = DetailMessages["wall"];
      results.execution = ExecutionStatus.Error;
    } else {
      results.newCoords = [newValue, col];
      results.newGridPos.gridRowStart = newValue + 1; //bcause css grid starts from 1
      results.execution = ExecutionStatus.True;
    }
  } else if (colValues.includes(rotation)) {
    let newValue = col + moveAmount;
    if (newValue < 0 || newValue >= GRID_COLS) {
      results.detail = DetailMessages["wall"];
      results.execution = ExecutionStatus.Error;
    } else {
      results.newCoords = [row, newValue];
      results.newGridPos.gridColumnStart = newValue + 1;
      results.execution = ExecutionStatus.True;
    }
  }

  return results;
};

const rotateRobot = (
  command: string,
  rotation: Robot["rotation"],
): Robot["rotation"] => {
  let newRotation: Robot["rotation"] = rotation;

  if (command === Command.Right) {
    newRotation += 90;
    if (newRotation > 270) {
      newRotation = 0;
    }
  } else if (command === Command.Left) {
    newRotation -= 90;
    if (newRotation < 0) {
      newRotation = 270;
    }
  }

  return newRotation as Robot["rotation"];
};
