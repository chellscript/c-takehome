import React from "react";
import { twMerge } from "tailwind-merge";
import { Log } from "../../types";
import { ExecutionStatus } from "@/utils/commands";

const LogScreen = ({ logs }: { logs: Log[] | [] }) => {
  const ExecutionStatusBgColors: Record<ExecutionStatus, string> = {
    [ExecutionStatus.True]: "bg-green-300",
    [ExecutionStatus.Error]: "bg-orange-300",
    [ExecutionStatus.False]: "bg-red-300",
    [ExecutionStatus.Complete]: "bg-yellow-200",
  };

  return (
    <div className="flex flex-col gap-y-4">
      <h3 className="text-center">Log Screen</h3>
      <div
        className={twMerge(
          "flex size-96 rounded-md border border-lime-700 bg-white",
          logs.length ? "p-4" : "items-center justify-center",
        )}
      >
        {logs.length ? (
          <div className="flex w-full flex-col-reverse gap-y-2 overflow-scroll">
            {logs.map(({ command, detail, executed }: Log, index: number) => (
              <div
                className={twMerge(
                  "block w-full border p-2",
                  ExecutionStatusBgColors[executed],
                )}
                key={index}
              >
                {index + 1}. <b className="uppercase">{String(command)}</b> :{" "}
                {detail}
              </div>
            ))}
          </div>
        ) : (
          <p> No logs given! Please give me some instructions</p>
        )}
      </div>
    </div>
  );
};

export default LogScreen;
