import React from 'react';
import Header from '../components/header';
import Detail from '../components/dashboard/Detail';
import Timer from '../components/dashboard/Timer';
import TotalFastingHours from '../components/dashboard/TotalFastingHours';
import RecentFasts from '../components/dashboard/RecentFasts';

export default function Dashboard() {
  return (
    <div className="c-dashboard">
      <Header />
      <div className="c-dashboard__timer">
        <Timer />
        <RecentFasts />
      </div>
      <Detail />
      {/* <TotalFastingHours /> */}
    </div>
  );
}
