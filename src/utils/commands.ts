export enum Command {
  Forward = 'F',
  Left = 'L',
  Right = 'R'
}

export enum ExecutionStatus {
  True = "True",
  Error = "Error",
  False = "False",
  Complete = 'Complete'
}

export const AllowedCommands: string[] = Object.values(Command)

export const DetailMessages = {
  [Command.Left]: "Rotate Left command executed",
  [Command.Right]: "Rotate Right command executed",
  [Command.Forward]: "Move Forward",
  unknown: "Instruction Not Understood!",
  wall: 'BANG, Robot hit a wall',
  complete: 'All instructions proccessed'
};

