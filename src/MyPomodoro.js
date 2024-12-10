import React, { useEffect, useState } from "react";

export default function MyPomodoro() {
  const [workTimeMinutes, setWorktimeMinutes] = useState(25);
  const [breakTimeMinutes, setBreakTimeMinutes] = useState(5);

  const [workTimeSeconds, setWorkTimeSeconds] = useState(1500);
  const [breakTimeSeconds, setBreakTimeSeconds] = useState(300);

  const [type, setType] = useState("work");
  const [flag, setFlag] = useState(false);
  const [resetFlag, setresetFlag] = useState(true);

  useEffect(() => {
    console.log(workTimeSeconds);

    if (flag && type === "work" && workTimeSeconds > 0) {
      setTimeout(() => {
        setWorkTimeSeconds(workTimeSeconds - 1);
      }, 1000);
    }
    if (workTimeSeconds === 0) {
      setType("break");
      setWorkTimeSeconds(1500);
    }

    if (flag && type === "break" && breakTimeSeconds > 0) {
      setTimeout(() => {
        setBreakTimeSeconds(breakTimeSeconds - 1);
      }, 1000);
    }
    if (breakTimeSeconds === 0) {
      setType("work");
      setBreakTimeSeconds(300);
    }
  }, [workTimeSeconds, breakTimeSeconds, type, flag]);


  const handleReset = () => {
    setBreakTimeMinutes(5)
    setWorktimeMinutes(25)
    setWorkTimeSeconds(workTimeMinutes * 60);
    setBreakTimeSeconds(breakTimeMinutes * 60);
    setFlag(false);
    setType('work');
    setresetFlag(true);
};


function handleSubmit(e){
  e.preventDefault()
  setWorkTimeSeconds(workTimeMinutes*60)
  setBreakTimeSeconds(breakTimeSeconds*60)
}

  function timeSetter(sec) {
    let minutes = parseInt(sec / 60).toString();
    let seconds = parseInt(sec % 60).toString();

    if (minutes.length < 2) minutes = "0" + minutes;
    if (seconds.length < 2) seconds = "0" + seconds;

    return minutes + " : " + seconds;
  }
  return (
    <div>
      <h1>
        {type === "work"
          ? timeSetter(workTimeSeconds)
          : timeSetter(breakTimeSeconds)}
      </h1>
      <h1>{type === "work" ? "WORK" : "BREAK"} - TIME</h1>

      <button
        disabled={flag}
        onClick={() => {
          setFlag(true);
          setresetFlag(false);
        }}
      >
        Start
      </button>

      <button disabled={!flag} onClick={() => setFlag(false)}>
        Stop
      </button>

      <button disabled={resetFlag} onClick={handleReset}>Reset</button>

      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="enter work time"
          value={workTimeMinutes}
          onChange={(e) => setWorktimeMinutes(e.target.value)}
        />

        <input
          type="number"
          placeholder="enter break time"
          value={breakTimeMinutes}
          onChange={(e) => setBreakTimeMinutes(e.target.value)}
        />

        <br />

        <button>Set</button>
      </form>
    </div>
  );
}
