import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
        return (
          <div key={task?.id}>
            <Link to={"task/"+ task?.slug} key={task?.id}>
              {task?.title}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
