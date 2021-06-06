import React, { useState, useEffect } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import pen from '../../assets/pencil.svg';
import moment from 'moment';
import { http } from '../../utility/http';
import { toast } from 'react-toastify';
import { ClockUpDown } from './CountUp';

export default function TimerComp() {
  // const [showBtn, setShowBtn] = useState('start');
  const [goalType, setGoalType] = useState('16:8');
  const [startedAt, setStartedAt] = useState(moment());
  const [endingAt, setEndingAt] = useState(moment());
  const [timerState, setTimerState] = useState('initial');
  const [fastId, setFastId] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const [initialTime, setInitialTime] = useState(0);
  const [timeCompleted, setTimeCompleted] = useState(0);

  const percentage = (timeCompleted * 100) / parseInt(goalType.split(':')[0]);

  useEffect(() => {
    http({
      method: 'post',
      url: '/fasts/current',
      data: { userId: user._id },
    }).then(({ data }) => {
      const currentFast = data.data;
      if (data.status && !data.err) {
        setGoalType(currentFast.goalType);
        setStartedAt(moment(currentFast.startedAt));
        setEndingAt(moment(currentFast.endingAt));
        setTimerState(currentFast.fastState);
        setFastId(currentFast._id);

        const now = new Date();
        const startedAt = new Date(currentFast.startedAt);
        const diffTime = Math.floor((Math.abs(now - startedAt) * 100) / 36);
        console.log('setInitialTime', diffTime);
        setInitialTime(diffTime);
      }
    });
  }, []);

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
        setInitialTime(0);
        setFastId(data.fast._id);
        setTimerState(data.fast.fastState);
        setStartedAt(moment(data.fast.startedAt));
        setEndingAt(moment(data.fast.endingAt));
      } else {
        toast.error(data.message);
      }
    });
  };

  const handleEndTimer = (fastingTime) => {
    const data = {
      fastId: fastId,
      fastingTime,
      // currentTime
    };

    http({
      method: 'post',
      url: '/fasts/end',
      data,
    }).then(({ data }) => {
      if (data && data.status) {
        toast.success(data.message);
        setInitialTime(0);

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
  return (
    <div className="c-timer card">
      <div className="c-timer__select-btn ">
        <select
          value={goalType}
          onChange={({ target }) => setGoalType(target.value)}
          disabled={timerState === 'started'}
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
          {/* {timerInside} */}
          <ClockUpDown
            handleStartTimer={handleStartTimer}
            handleEndTimer={handleEndTimer}
            initialTime={initialTime}
            setTimeCompleted={setTimeCompleted}
            timerState={timerState}
          />
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
