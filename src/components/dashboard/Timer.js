import React, { useState } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Timer from 'react-compound-timer';
import pen from '../../assets/pencil.svg';
import moment from 'moment';
import { http } from '../../utility/http';
import { toast } from 'react-toastify';

export default function TimerComp() {
  const percentage = 12;
  const [showBtn, setShowBtn] = useState('start');
  const [goalType, setGoalType] = useState('16:8');
  const [startedAt, setStartedAt] = useState(moment());
  const [endingAt, setEndingAt] = useState(moment());
  const [timerState, setTimerState] = useState('initial');
  const [fastId, setFastId] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleStartTimer = () => {
    const fastingHours = goalType.split(':')[0];

    const startedAt = moment();
    const endingAt = moment().add(fastingHours, 'hour');

    const data = {
      goalType,
      fastState: 'started',
      startedAt,
      endingAt,
      fastingTime: '0',
      totalFastingTime: fastingHours,
      date: startedAt.format('DD-MM-YYYY'),
      userId: user._id,
    };

    http({
      method: 'post',
      url: '/fasts/create',
      data,
    }).then(({ data }) => {
      if (data && data.status) {
        toast.success(data.message);
        setFastId(data.fast._id);
        setTimerState(data.fast.fastState);
        setStartedAt(moment(data.fast.startedAt));
        setEndingAt(moment(data.fast.endingAt));
      } else {
        toast.error(data.message);
      }
    });
  };

  const handleEndTimer = () => {
    const data = {
      fastId: fastId,
      // currentTime
    };

    http({
      method: 'post',
      url: '/fasts/end',
      data,
    }).then(({ data }) => {
      if (data && data.status) {
        toast.success(data.message);
        setFastId('');
        setTimerState(data.data.fastState);
        setStartedAt(moment(data.data.startedAt));
        setEndingAt(moment(data.data.endingAt));
      } else {
        toast.error(data.message);
      }
    });
    setTimerState('ended');
    setStartedAt(moment());
    setEndingAt(moment());

    // setEndingAt(())
  };

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
              onClick={() => {
                handleStartTimer();
                start();
              }}
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
                handleEndTimer();
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
        <select
          value={goalType}
          onChange={({ target }) => setGoalType(target.value)}
        >
          <option key="16:8" value="16:8">
            16:8
          </option>
          <option key="18:6" value="18:6">
            18:6
          </option>
          <option key="20:4" value="20:4">
            20:4
          </option>
        </select>
        <img src={pen} alt="pen" />
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
            {timerState === 'started'
              ? startedAt.format('DD MMM, hh:mm A')
              : '--:--:--'}
          </div>
        </div>
        <div>
          <div className="c-timer__label">FAST ENDING</div>
          <div className="c-timer__text">
            {timerState === 'started'
              ? endingAt.format('DD MMM, hh:mm A')
              : '--:--:--'}
          </div>
        </div>
      </div>
    </div>
  );
}
