import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import tasksApi from "../../apis/tasks";

const Details = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  const fetchTasks = async () => {
    try {
      const {
        data: { task },
      } = await tasksApi.show(slug);
      setTasks(task);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  console.log(tasks);
  return <div>{tasks?.title}</div>;
};

export default Details;
