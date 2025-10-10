import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import tasksApi from "../../apis/tasks";

const Dashboard = () => {
  const [tasks, setTask] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("tasks");
      setTask(data?.tasks);
    })();
  }, []);

  const handleDelete = async slug => {
    try {
      if (slug) {
        await tasksApi.destroy(slug);
        window.location.replace("/");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {tasks.map(task => {
        return (
          <div key={task?.id}>
            <Link to={"task/" + task?.slug} key={task?.id}>
              {task?.title}
            </Link>
            <button onClick={() => handleDelete(task?.slug)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
