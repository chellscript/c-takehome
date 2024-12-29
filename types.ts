import { Command, ExecutionStatus } from "@/utils/commands";

export type Log = {
  command: typeof Command | string
  detail: string
  executed: ExecutionStatus
}

export interface Robot {
  name: string;
  coords: [number, number];
  rotation: 0 | 90 | 180 | 270;
  positionStyle: {
    gridColumnStart: number;
    gridRowStart: number;
    transform: string;
  };
};




export type LogState = React.Dispatch<React.SetStateAction<Log[]>> | []
