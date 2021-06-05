import React, { useState } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Timer from 'react-compound-timer';
import pen from '../../assets/pencil.svg';
import moment from 'moment';

export default function TimerComp() {
  const percentage = 12;
  const [showBtn, setShowBtn] = useState('start');

  const timerInside = (
    <Timer
      formatValue={(v) => v.toString().padStart(2, '0')}
      initialTime={0}
      startImmediately={false}
      onStart={() => setShowBtn('stop')}
      onResume={() => console.log('onResume hook')}
      onPause={() => console.log('onPause hook')}
      onStop={() => setShowBtn('start')}
      onReset={() => console.log('onReset hook')}
    >
      {({ start, resume, pause, stop, reset, timerState }) => (
        <React.Fragment>
          <div className="c-timer__label">Fasting Time</div>
          <div className="c-timer__time">
            <Timer.Hours />:
            <Timer.Minutes />:
            <Timer.Seconds />
          </div>
          <div className="c-timer__btns">
            <button
              className={`c-timer__btn  ${showBtn === 'start' ? 'show' : ''}`}
              onClick={start}
            >
              Start
            </button>
            <button
              className={`c-timer__btn  ${showBtn === 'pause' ? 'show' : ''}`}
              onClick={pause}
            >
              Pause
            </button>
            <button
              className={`c-timer__btn  ${showBtn === 'resume' ? 'show' : ''}`}
              onClick={resume}
            >
              Resume
            </button>
            <button
              className={`c-timer__btn  ${showBtn === 'stop' ? 'show' : ''}`}
              onClick={() => {
                stop();
                reset();
              }}
            >
              End
            </button>
            <button
              className={`c-timer__btn  ${showBtn === 'reset' ? 'show' : ''}`}
              onClick={reset}
            >
              Reset
            </button>
          </div>
        </React.Fragment>
      )}
    </Timer>
  );

  return (
    <div className="c-timer card">
      <div className="c-timer__select-btn ">
        <button>
          16:8
          <img src={pen} alt="pen" />
        </button>
      </div>
      <div className="c-timer__progress">
        <CircularProgressbarWithChildren
          value={percentage}
          // text={`${percentage}%`}
          strokeWidth="6"
          circleRatio={0.85}
          styles={buildStyles({
            rotation: 0.575,
            pathColor: '#F2B3A1',
            trailColor: '#242370',
          })}
        >
          {timerInside}
        </CircularProgressbarWithChildren>
      </div>
      <div className="c-timer__footer ">
        <div>
          <div className="c-timer__label">STARTED</div>
          <div className="c-timer__text">
            {moment().format('DD MMM, HH:MM A')}
          </div>
        </div>
        <div>
          <div className="c-timer__label">FAST ENDING</div>
          <div className="c-timer__text">
            {moment().format('DD MMM, HH:MM A')}
          </div>
        </div>
      </div>
    </div>
  );
}
