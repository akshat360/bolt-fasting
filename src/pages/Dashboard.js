import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Detail from '../components/dashboard/Detail';
import Timer from '../components/dashboard/Timer';
import TotalFastingHours from '../components/dashboard/TotalFastingHours';
import RecentFasts from '../components/dashboard/RecentFasts';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { http } from '../utility/http';

export default function Dashboard() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));
  const [reload, setReload] = useState(false);
  const [resUser, setResUser] = useState({});

  useEffect(() => {
    if (!user || !user?._id) {
      toast.error('Access Denied');
      history.push('/');
    } else {
      http({
        method: 'post',
        url: '/fasts/details',
        data: { userId: user._id },
      }).then(({ data }) => {
        if (data.status) {
          setResUser(data.data);
          localStorage.setItem('user', JSON.stringify(data.data));
        }
      });
    }
  }, [reload]);

  if (user && user._id)
    return (
      <div className="c-dashboard">
        <Header />
        <div className="c-dashboard__timer">
          <Timer user={user} setReload={setReload} />
          <RecentFasts user={resUser} />
        </div>
        <Detail user={resUser} />
        {/* <TotalFastingHours /> */}
      </div>
    );
  return <div></div>;
}
