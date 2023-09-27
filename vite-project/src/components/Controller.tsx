import { useState, useEffect } from "react";
import React from "react";
import Button from "./Button";
import Betbox from "./Betbox";
import axios from "axios";

function Controller() {
  // [getter, setter]
  const [hasWon, setHasWon] = useState(false);
  const [betDirection, setBetDirection] = useState("up");
  const [isLoading, setIsLoading] = useState(false);
  const [valStored, setValStored] = useState(0);
  const [totalBets, setTotalBets] = useState(0);
  const [totalWins, setTotalWins] = useState(0);
  const [winPct, setWinPct] = useState(100);

  const handlePlaceBet = async () => {
    setIsLoading(true);

    let isWinner = false;
    const url =
      "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new";
    await axios
      .get(url)
      .then((res) => {
        if (res.status == 200) {
          const val = res.data;
          console.log(val);
          setValStored(val);
          if (val >= 50 && betDirection == "up") {
            isWinner = true;
          } else if (val < 50 && betDirection == "down") {
            isWinner = true;
          }
        } else {
          console.error("There was some kind of error getting the data");
        }
      })
      .catch((err) => {
        console.log(err.data, err.message);
      });

    // set win pct
    var tWins = totalWins;
    var tBets = totalBets + 1;
    if (isWinner) {
      tWins = totalWins + 1;
      setTotalWins(tWins);
    }
    setTotalBets(tBets);
    var wPct = totalWins / totalBets;
    setWinPct(wPct); // ig vars are only set after fnc runs
    console.log(
      "Total Wins: " + tWins + " Total Bets: " + tBets + " Win %: " + wPct
    );

    // Cleanup and close, return winner
    setHasWon(isWinner);
    setIsLoading(false);
  };

  // user effect hooks better placed after functions
  useEffect(() => {
    console.log(hasWon);
  }, [hasWon]);
  // when var in [] is changed, run function

  return (
    <div className="w-full md:w-[850] lg:w-[1200px] mx-auto px-5 py-12">
      <Button runFunction={handlePlaceBet} />
      <Betbox
        betDirection={betDirection}
        setBetDirection={setBetDirection}
        isLoading={isLoading}
        valStored={valStored}
        hasWon={hasWon}
        winPct={winPct}
      />
    </div>
  );
}

export default Controller;
