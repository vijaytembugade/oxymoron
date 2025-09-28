import { useEffect, useState } from "react";
import React from 'react'
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTask] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("tasks");
      setTask(data?.tasks);
    })();
  }, []);

  return (
    <div>
      {tasks.map(task => {
        return <p key={task?.id}>{task?.title}</p>;
      })}
    </div>
  );
};

export default Dashboard;
