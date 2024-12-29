import React, { useState } from "react";
import Robotto from "./robotto";
import { Robot } from "../../types";

const Grid = ({
  rows,
  cols,
  state,
  robot,
}: {
  rows: number;
  cols: number;
  state: number[][];
  robot: Robot;
}) => {
  const grid_dimension = {
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
  };

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <div className="flex size-fit flex-col gap-y-2">
        <div className="flex flex-row gap-2">
          <div id="row" className="flex flex-col-reverse flex-nowrap gap-y-2">
            {Array.from({ length: rows }).map((_, index) => (
              <div
                key={index}
                className="dimension-max flex place-items-center border bg-white p-4 font-bold"
              >
                {index}
              </div>
            ))}
          </div>
          <div style={grid_dimension} className="env-grid relative grid gap-2">
            <Robotto name={robot.name} style={robot.positionStyle} />
            {state.flat().map((value: number, index: number) => (
              <button
                className={`dimension-max border border-sky-400 text-black ${
                  value === 1
                    ? "bg-orange-200 hover:bg-orange-300"
                    : "bg-sky-200 hover:bg-sky-300"
                }`}
                key={index}
              ></button>
            ))}
          </div>
        </div>
        <div id="cols" className="flex gap-2 self-end">
          {Array.from({ length: cols }).map((_: unknown, index: number) => (
            <div
              key={index}
              className="dimension-max flex place-items-center border bg-white p-4 font-bold"
            >
              {index}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grid;
