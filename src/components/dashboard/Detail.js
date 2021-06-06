import React, { useEffect, useState } from 'react';
import { http } from '../../utility/http';

export default function Detail() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [dataArr, setDataArr] = useState({
    totalFasts: '0',
    fastAvg7: '0',
    longestFast: '0',
    longestStreak: '0',
    currentStreak: '0',
  });
  const [resUser, setResUser] = useState({});
  const [fastAvg7, setFastAvg7] = useState(0);

  useEffect(() => {
    http({
      method: 'post',
      url: '/fasts/details',
      data: { userId: user._id },
    }).then(({ data }) => {
      if (data.status) {
        setResUser(data.data);
        //calc
        let avg = 0;
        data?.data?.fasts
          .slice(7)
          .forEach((fast) => (avg = avg + parseFloat(fast.fastingTime)));
        setFastAvg7(avg / 7);
      }
    });
  }, []);

  return (
    <div className="c-detail card">
      <div className="c-detail__box">
        <div className="c-detail__label">Total Fasts</div>
        <div className="c-detail__value">{resUser?.fasts?.length}</div>
      </div>
      <div className="c-detail__box">
        <div className="c-detail__label">7-fast avg.</div>
        <div className="c-detail__value">{fastAvg7.toFixed(2)}h</div>
      </div>
      <div className="c-detail__box">
        <div className="c-detail__label">Longest Fast</div>
        <div className="c-detail__value">{dataArr.longestFast}h</div>
      </div>
      <div className="c-detail__box">
        <div className="c-detail__label">Longest Streak</div>
        <div className="c-detail__value">{dataArr.longestStreak}</div>
      </div>
      <div className="c-detail__box">
        <div className="c-detail__label">Current Streak</div>
        <div className="c-detail__value">{dataArr.currentStreak}</div>
      </div>
    </div>
  );
}
