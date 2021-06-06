import Timer from 'react-compound-timer';
import React, { useEffect } from 'react';
import { useTimer } from 'react-compound-timer';

// const withTimer = (timerProps) => (WrappedComponent) => (
//   wrappedComponentProps
// ) => (
//   <Timer {...timerProps}>
//     {(timerRenderProps) => (
//       <WrappedComponent {...wrappedComponentProps} timer={timerRenderProps} />
//     )}
//   </Timer>
// );

export const ClockUpDown = (props) => {
  const {
    initialTime,
    timerState,
    handleEndTimer,
    handleStartTimer,
    setTimeCompleted,
  } = props;

  const {
    value,
    controls: { setTime, reset, getTime, start, stop },
  } = useTimer({
    initialTime: timerState === 'started' ? initialTime : 0,
    startImmediately: false,
  });

  useEffect(() => {
    timerState === 'started' ? setTime(initialTime) : setTime(0);
    console.log('initialTime', initialTime);
    if (timerState === 'started' && initialTime > 0) start();
  }, [initialTime]);

  useEffect(() => {
    setTimeCompleted(getTime() / (1000 * 60 * 60));
  }, [getTime()]);

  return (
    <React.Fragment>
      <div className="c-timer__label">Fasting Time</div>
      {/* {getTime()} */}
      <div className="c-timer__time">{`${value.h
        .toString()
        .padStart(2, '0')}:${value.m
        .toString()
        .padStart(2, '0')}:${value.s.toString().padStart(2, '0')}`}</div>
      <div className="c-timer__btns">
        {timerState === 'started' ? (
          <button
            className={`c-timer__btn show`}
            onClick={() => {
              handleEndTimer(getTime() / (1000 * 60 * 60));
              stop();
              reset();
            }}
          >
            End
          </button>
        ) : (
          <button
            className={`c-timer__btn show `}
            onClick={() => {
              handleStartTimer();
              start();
            }}
          >
            Start
          </button>
        )}
      </div>
    </React.Fragment>
  );
};

// export const TimerHOC = withTimer({
//   initialTime: 50000,
//   startImmediately: false,
//   formatValue: (v) => v.toString().padStart(2, '0'),
// })(ClockUpDown);
