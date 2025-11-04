import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import tasksApi from "../../apis/tasks";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const [tasks, setTask] = useState([]);

  const { isPending, error, data } = useQuery({
    queryKey: ["getTasks"],
    queryFn: () => tasksApi.fetch().then(res => res?.data?.tasks),
  });

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
  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  console.log(data);
  return (
    <div>
      {data &&
        data.map(task => {
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
