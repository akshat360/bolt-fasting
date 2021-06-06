import React, { useEffect } from 'react';
import Header from '../components/header';
import Detail from '../components/dashboard/Detail';
import Timer from '../components/dashboard/Timer';
import TotalFastingHours from '../components/dashboard/TotalFastingHours';
import RecentFasts from '../components/dashboard/RecentFasts';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || !user?._id) {
      toast.error('Access Denied');
      history.push('/');
    }
  }, [user]);

  if (user && user._id)
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
  return <div></div>;
}
