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

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft());

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, SECOND);

    return () => window.clearInterval(timerId);
  }, []);

  const hasStarted =
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
              <strong suppressHydrationWarning>{timeLeft.days}</strong>
              <span>дней</span>
            </span>
            <span className="countdown__item">
              <strong suppressHydrationWarning>{formatUnit(timeLeft.hours)}</strong>
              <span>часов</span>
            </span>
            <span className="countdown__item">
              <strong suppressHydrationWarning>{formatUnit(timeLeft.minutes)}</strong>
              <span>минут</span>
            </span>
            <span className="countdown__item">
              <strong suppressHydrationWarning>{formatUnit(timeLeft.seconds)}</strong>
              <span>секунд</span>
            </span>
          </div>
        </>
      )}
    </div>
  );
}
