"use client";

import { useEffect, useState } from "react";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const TAGANROG_UTC_OFFSET = 3 * HOUR;
const WEDDING_YEAR = 2026;
const WEDDING_MONTH_INDEX = 7;
const WEDDING_DAY = 23;
const WEDDING_HOUR = 15;

type CountdownPending = {
  hasStarted: false;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type CountdownStarted = {
  hasStarted: true;
};

export type CountdownState = CountdownPending | CountdownStarted;

function taganrogLocalTimeToUtc(
  year: number,
  monthIndex: number,
  day: number,
  hours = 0,
  minutes = 0,
  seconds = 0,
) {
  return Date.UTC(year, monthIndex, day, hours, minutes, seconds) - TAGANROG_UTC_OFFSET;
}

function getTaganrogDayStart(nowMs: number) {
  const taganrogDate = new Date(nowMs + TAGANROG_UTC_OFFSET);

  return taganrogLocalTimeToUtc(
    taganrogDate.getUTCFullYear(),
    taganrogDate.getUTCMonth(),
    taganrogDate.getUTCDate(),
  );
}

function getClockParts(distance: number) {
  return {
    hours: Math.floor((distance % DAY) / HOUR),
    minutes: Math.floor((distance % HOUR) / MINUTE),
    seconds: Math.floor((distance % MINUTE) / SECOND),
  };
}

export function getCountdownState(nowMs = Date.now()): CountdownState {
  const weddingDayStart = taganrogLocalTimeToUtc(
    WEDDING_YEAR,
    WEDDING_MONTH_INDEX,
    WEDDING_DAY,
  );
  const weddingStart = taganrogLocalTimeToUtc(
    WEDDING_YEAR,
    WEDDING_MONTH_INDEX,
    WEDDING_DAY,
    WEDDING_HOUR,
  );

  if (nowMs >= weddingStart) {
    return { hasStarted: true };
  }

  const todayStart = getTaganrogDayStart(nowMs);

  if (todayStart < weddingDayStart) {
    const nextMidnight = todayStart + DAY;
    const distanceToMidnight = Math.min(Math.max(nextMidnight - nowMs, 0), DAY - SECOND);

    return {
      hasStarted: false,
      days: Math.round((weddingDayStart - todayStart) / DAY),
      ...getClockParts(distanceToMidnight),
    };
  }

  return {
    hasStarted: false,
    days: 0,
    ...getClockParts(Math.max(weddingStart - nowMs, 0)),
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
  const [countdown, setCountdown] = useState<CountdownState | null>(null);

  useEffect(() => {
    function tick() {
      setCountdown(getCountdownState());
    }

    tick();

    const timerId = window.setInterval(tick, SECOND);

    return () => window.clearInterval(timerId);
  }, []);

  return (
    <div className="countdown" aria-label="Обратный отсчёт до начала мероприятия">
      {countdown?.hasStarted ? (
        <p className="countdown__started">Мы уже ждём вас!</p>
      ) : (
        <>
          <p className="countdown__title">До начала торжества осталось</p>
          <div className="countdown__grid" role="timer" aria-live="polite">
            <span className="countdown__item">
              <strong>{formatCountdownValue(countdown?.days ?? null)}</strong>
              <span>дней</span>
            </span>
            <span className="countdown__item">
              <strong>{formatCountdownValue(countdown?.hours ?? null, true)}</strong>
              <span>часов</span>
            </span>
            <span className="countdown__item">
              <strong>{formatCountdownValue(countdown?.minutes ?? null, true)}</strong>
              <span>минут</span>
            </span>
            <span className="countdown__item">
              <strong>{formatCountdownValue(countdown?.seconds ?? null, true)}</strong>
              <span>секунд</span>
            </span>
          </div>
        </>
      )}
    </div>
  );
}
