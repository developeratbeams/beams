import { useEffect, useState } from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({ subsets: ["latin"] });
interface CountdownTimerProps {
  seconds: number;
  key?: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ key, seconds }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft, key]);
  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);
  const progressValue = 100 - (timeLeft / seconds) * 100;

  return (
    <CircularProgress
      value={progressValue}
      size="50px"
      thickness="12px"
      capIsRound
      trackColor="gray.400"
      color="gray.200"
    >
      <CircularProgressLabel className={quicksand.className} fontWeight={700}>
        {timeLeft}
      </CircularProgressLabel>
    </CircularProgress>
  );
};

export default CountdownTimer;
