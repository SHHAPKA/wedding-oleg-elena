"use client";

import { useEffect, useState } from "react";

const EVENT_START = new Date("2026-08-23T15:00:00+03:00").getTime();
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const distance = Math.max(EVENT_START - Date.now(), 0);

  return {
    days: Math.floor(distance / DAY),
    hours: Math.floor((distance % DAY) / HOUR),
    minutes: Math.floor((distance % HOUR) / MINUTE),
    seconds: Math.floor((distance % MINUTE) / SECOND),
  };
}

function formatUnit(value: number) {
  return String(value).padStart(2, "0");
}

function formatCountdownValue(value: number | null, shouldPad = false) {
  if (value === null) {
    return "--";
  }

  return shouldPad ? formatUnit(value) : String(value);
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    function tick() {
      setTimeLeft(getTimeLeft());
    }

    tick();

    const timerId = window.setInterval(tick, SECOND);

    return () => window.clearInterval(timerId);
  }, []);

  const hasStarted =
    timeLeft !== null &&
    timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className="countdown" aria-label="Обратный отсчёт до начала мероприятия">
      {hasStarted ? (
        <p className="countdown__started">Мы уже ждём вас!</p>
      ) : (
        <>
          <p className="countdown__title">До начала торжества осталось</p>
          <div className="countdown__grid" role="timer" aria-live="polite">
            <span className="countdown__item">
              <strong>{formatCountdownValue(timeLeft?.days ?? null)}</strong>
              <span>дней</span>
            </span>
            <span className="countdown__item">
              <strong>{formatCountdownValue(timeLeft?.hours ?? null, true)}</strong>
              <span>часов</span>
            </span>
            <span className="countdown__item">
              <strong>{formatCountdownValue(timeLeft?.minutes ?? null, true)}</strong>
              <span>минут</span>
            </span>
            <span className="countdown__item">
              <strong>{formatCountdownValue(timeLeft?.seconds ?? null, true)}</strong>
              <span>секунд</span>
            </span>
          </div>
        </>
      )}
    </div>
  );
}
