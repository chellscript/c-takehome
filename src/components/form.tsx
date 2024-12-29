import React, { FormEvent } from "react";

const Form = ({
  handleReset,
  handleSubmitCommands,
  commands,
  setCommands,
}: {
  handleReset: () => void;
  handleSubmitCommands: (arg: FormEvent<HTMLFormElement>) => void;
  commands: string;
  setCommands: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCommands = event.target.value.trim();
    setCommands(newCommands);
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => handleSubmitCommands(event)}
    >
      <div>
        <h2 className="mb-0">Enter Instructions Here</h2>
        <p className="m-0">
          F='Forward One Space', L='Turn Left', R='Turn Right'
        </p>
      </div>

      <textarea
        data-testid="commands-textarea"
        className="h-20 max-h-10 w-full border border-black"
        name="commands"
        rows={10}
        value={commands}
        placeholder="ready for your instructions "
        onChange={(event) => handleChange(event)}
      />
      <div className="flex w-full justify-end gap-2">
        <button
          data-testid="submit-button"
          className="self-end rounded-lg border bg-orange-500 p-2 text-white disabled:grayscale"
          type="submit"
          disabled={commands.length === 0}
        >
          Submit
        </button>
        <button
          data-testid="reset-button"
          className="self-end rounded-lg border bg-blue-500 p-2 text-white disabled:grayscale"
          type="button"
          disabled={commands.length === 0}
          onClick={() => {
            setCommands("");
            handleReset();
          }}
        >
          Reset Inputs
        </button>
      </div>
    </form>
  );
};

export default Form;
