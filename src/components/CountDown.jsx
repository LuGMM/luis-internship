import React, { useEffect, useState } from "react";

const CountDown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  const [intervalId, setIntervalId] = useState();

  useEffect(() => {
    calcTime();

    const intervalId = setInterval(() => {
      calcTime();
    }, 1000);

    setIntervalId(intervalId);
  }, []);

  function calcTime() {
    const milliSecsLeft = expiryDate - Date.now();

    if (milliSecsLeft < 0) {
      clearInterval(intervalId);
      setTimeLeft("EXPIRED");
      return;
    }

    const secLeft = milliSecsLeft / 1000;
    const minutesLeft = secLeft / 60;
    const hoursLeft = minutesLeft / 60;

    setTimeLeft(
      `${Math.floor(hoursLeft)}h ${Math.floor(minutesLeft % 60)}min ${Math.floor(secLeft % 60)}s`,
    );
  }

  return <div className="de_countdown">{timeLeft}</div>;
};

export default CountDown;
