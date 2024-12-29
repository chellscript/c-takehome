import Image from "next/image";
import React from "react";
import Robot from "../../public/robotto.svg";

const Robotto = ({ name, style = {} }: { name: string; style?: object }) => {
  return (
    <div
      id={name}
      className="absolute z-50 flex size-10 items-center justify-center"
      style={style}
    >
      <Image src={Robot} alt={name} className="robot size-4/5" />
    </div>
  );
};

export default Robotto;
