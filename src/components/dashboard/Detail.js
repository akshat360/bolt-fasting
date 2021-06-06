import React, { useEffect, useState } from 'react';

export default function Detail({ user }) {
  const [fastAvg7, setFastAvg7] = useState(0);
  const [longestFast, setLongestFast] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    console.log('asdasd', user.fasts);
    if (user) {
      if (user?.fasts?.length > 0) {
        let avg = 0;
        user?.fasts
          ?.slice(0, 7)
          .forEach((fast) => (avg = avg + parseFloat(fast.fastingTime)));
        setFastAvg7((avg / 7)?.toFixed(2));

        const longestTime =
          user?.fasts?.length > 0 &&
          user?.fasts?.reduce((prev, curr) =>
            parseFloat(curr.fastingTime) > parseFloat(prev.fastingTime)
              ? curr
              : prev
          );
        setLongestFast(parseFloat(longestTime?.fastingTime)?.toFixed(2));

        console.log('avg', avg);
      }
    }
  }, [user]);

  return (
    <div className="c-detail card">
      <div className="c-detail__box">
        <div className="c-detail__label">Total Fasts</div>
        <div className="c-detail__value">{user?.fasts?.length}</div>
      </div>
      <div className="c-detail__box">
        <div className="c-detail__label">7-fast avg.</div>
        <div className="c-detail__value">{fastAvg7}h</div>
      </div>
      <div className="c-detail__box">
        <div className="c-detail__label">Longest Fast</div>
        <div className="c-detail__value">{user?.longestFast}h</div>
      </div>
      <div className="c-detail__box">
        <div className="c-detail__label">Longest Streak</div>
        <div className="c-detail__value">{user?.longestStreak}</div>
      </div>
      <div className="c-detail__box">
        <div className="c-detail__label">Current Streak</div>
        <div className="c-detail__value">{user?.currentStreak}</div>
      </div>
    </div>
  );
}
