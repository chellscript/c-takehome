"use client";

import Form from "@/components/form";
import Grid from "@/components/grid";
import LogScreen from "@/components/logScreen";
import { parseInstructions, processInstructions } from "@/utils/functions";
import { FormEvent, useEffect, useState } from "react";
import { Log, Robot } from "../../types";
import { GRID_COLS, GRID_ROWS } from "@/utils/constants";

const ROBOT_DEFAULT: Robot = {
  name: "Robot1",
  coords: [0, 0],
  rotation: 0,
  positionStyle: {
    gridColumnStart: 1,
    gridRowStart: 1,
    transform: "rotate(0deg)",
  },
};

const GRID_STATE_DEFAULT = Array.from({ length: GRID_ROWS }, () =>
  Array(GRID_COLS).fill(0),
);

export default function Home() {
  const [grid, setGrid] = useState<number[][]>(GRID_STATE_DEFAULT);
  const [robot, setRobot] = useState<Robot>(ROBOT_DEFAULT);

  const [commands, setCommands] = useState<string>("");
  const [logs, setLogs] = useState<Log[] | []>([]);
  // const [shouldStop, setShouldStop] = useState(false); to stop function

  useEffect(() => {
    setGrid((prev) => {
      const [row, col] = robot.coords;

      const newGrid = [...prev];
      newGrid[row] = [...newGrid[row]];
      newGrid[row][col] = 1;

      return newGrid;
    });
  }, [robot.coords]);

  const handleReset = () => {
    setLogs([]);
    setRobot(ROBOT_DEFAULT);
    setGrid(GRID_STATE_DEFAULT);
  };

  const handleSubmitCommands = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLogs([]);
    const data = new FormData(event.currentTarget);

    const values: { [key: string]: string } = {};

    data.forEach((value, key) => {
      values[key] = value as string;
    });

    if (values.commands.length) {
      let instructionArr = parseInstructions(values.commands);

      processInstructions(instructionArr, setLogs, setRobot);
    } else {
      // Returr error if not commands found
    }
  };

  return (
    <div className="debug flex flex-col items-center justify-center bg-sky-100 p-4">
      <div className="website-max-width flex w-8/12 flex-col gap-y-8">
        <Form
          handleSubmitCommands={handleSubmitCommands}
          commands={commands}
          setCommands={setCommands}
          handleReset={handleReset}
        />
        <div className="flex w-full items-center justify-center gap-x-8 p-4">
          <Grid robot={robot} cols={GRID_COLS} rows={GRID_ROWS} state={grid} />
          <LogScreen logs={logs} />
        </div>
        <button
          className="w-full rounded-lg border bg-orange-500 p-2 text-white disabled:grayscale"
          onClick={handleReset}
          disabled={logs.length === 0}
        >
          Reset Grid and Robot
        </button>
      </div>
    </div>
  );
}
