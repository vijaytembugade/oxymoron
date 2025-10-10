import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import tasksApi from "../../apis/tasks";

const Details = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editedTitle, setEditedTitle] = useState(tasks?.title);
  const [isEditing, setEditing] = useState(false);
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

  const handleSubmit = async () => {
    try {
      await tasksApi.edit(slug, { title: editedTitle });
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (isEditing === true) {
    return (
      <>
        <input
          value={editedTitle}
          onChange={e => setEditedTitle(e.target.value)}
        ></input>
        <button onClick={handleSubmit}>Submit</button>
      </>
    );
  }

  return (
    <div>
      <h2>{tasks?.title}</h2>
      <button onClick={() => setEditing(!isEditing)}>edit</button>
    </div>
  );
};

export default Details;
