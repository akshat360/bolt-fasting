import React, { useEffect, useState } from 'react';
import { http } from '../../utility/http';

export default function Detail() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [dataArr, setDataArr] = useState({
    totalFasts: '14',
    fastAvg7: '16',
    longestFast: '18.1',
    longestStreak: '14',
    currentStreak: '14',
  });
  const [resUser, setResUser] = useState({});

  useEffect(() => {
    http({
      method: 'post',
      url: '/fasts/details',
      data: { userId: user._id },
    }).then(({ data }) => {
      // if (data.status && !data.err) {
      //   // localStorage.setItem(user,  )
      // }
    });
  }, []);

  return (
    <div className="c-detail card">
      <div className="c-detail__box">
        <div className="c-detail__label">Total Fasts</div>
        <div className="c-detail__value">{dataArr.totalFasts}</div>
      </div>
      <div className="c-detail__box">
        <div className="c-detail__label">7-fast avg.</div>
        <div className="c-detail__value">{dataArr.fastAvg7}h</div>
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
