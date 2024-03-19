import { useEffect, useState } from "react";

const Countdown = () => {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [countDownDate, setCountDownDate] = useState(getFutureDate().getTime());

  function getFutureDate() {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date;
  }
  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date().getTime();
      const diff = countDownDate - currentDate;
      if (diff < 0) {
        setCountDownDate(getFutureDate().getTime());
        return;
      }
      const daysRemaining = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hoursRemaining = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutesRemaining = Math.floor(
        (diff % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondsRemaining = Math.floor((diff % (1000 * 60)) / 1000);

      setDays(formatTime(daysRemaining));
      setHours(formatTime(hoursRemaining));
      setMinutes(formatTime(minutesRemaining));
      setSeconds(formatTime(secondsRemaining));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [countDownDate]);

  const formatTime = (time) => {
    if (time < 0) {
      return `00`;
    }
    return time < 10 ? `0${time}` : `${time}`;
  };
  return (
    <section className="countdown">
      <div className="time-title-1">
        <h1>Make a purchase before </h1>
        <h1>
          and get <span style={{ color: "#54bab9" }}>free delivery </span>and{" "}
          <span style={{ color: "#54bab9" }}>upto 60% off</span>
        </h1>
      </div>
      <div className="time-container">
        <div>
          <span id="days">{days}</span>Days
        </div>
        <h2>:</h2>
        <div>
          <span id="hours">{hours}</span>Hours
        </div>
        <h2>:</h2>
        <div>
          <span id="min">{minutes}</span>Minutes
        </div>
        <h2>:</h2>
        <div>
          <span id="sec">{seconds}</span>Seconds
        </div>
      </div>
      <div className="time-title-2">
        <h1>
          and get <span style={{ color: "#54bab9" }}>free delivery </span>and{" "}
          <span style={{ color: "#54bab9" }}>upto 60% off</span>
        </h1>
      </div>
    </section>
  );
};

export default Countdown;
