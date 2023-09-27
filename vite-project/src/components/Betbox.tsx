import React from "react";
import BetButton from "./BetButton";

type Props = {
  betDirection: string;
  setBetDirection: any;
  isLoading: boolean;
  hasWon: boolean;
  valStored: number;
  winPct: number;
};

function Betbox({
  betDirection,
  setBetDirection,
  isLoading,
  valStored,
  hasWon,
  winPct,
}: Props) {
  return (
    <div className="mt-5">
      <div className="py-4 border bg-gray-800 text-right text-white pr-5">
        {isLoading ? "Loading..." : `Random Number Returned: ${valStored}`}
      </div>
      <div className="py-4 border bg-gray-800 text-right text-white pr-5">
        {`Win %: ${winPct.toFixed(2)}`}
      </div>
      <div className="flex flex-row justify-between py-2 border">
        <BetButton
          direction="down"
          betDirection={betDirection}
          setBetDirection={setBetDirection}
        />
        <BetButton
          direction="up"
          betDirection={betDirection}
          setBetDirection={setBetDirection}
        />
      </div>
      <div className="py-2 border bg-fuchsia-100 text-center text-4xl font-bold">
        {valStored != 0 && (
          <div className={"" + (hasWon ? "text-green-500" : "text-red-500")}>
            {hasWon ? "You're a winner!" : "You're a loser!!! LOL!!"}
          </div>
        )}
      </div>
    </div>
  );
}

export default Betbox;
