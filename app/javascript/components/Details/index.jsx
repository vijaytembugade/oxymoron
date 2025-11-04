import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import tasksApi from "../../apis/tasks";
import { useMutation, useQuery } from "@tanstack/react-query";
import UserSelect from "../Form/UserSelect";

const Details = () => {
  const [selectedUser, setSelectedUser] = useState();
  const { slug } = useParams();
  const { data, isPending, error } = useQuery({
    queryKey: ["getTask", slug],
    queryFn: () => tasksApi.show(slug).then(res => res?.data?.task),
  });

  const [editedTitle, setEditedTitle] = useState("");

  const mutation = useMutation({
    mutationFn: (editedTitle, selectedUser) =>
      tasksApi.edit(slug, {
        title: editedTitle,
        assigned_user_id: selectedUser,
      }),
    onSuccess: data => {
      console.log("Mutation Success:", data);
    },
    onError: error => {
      console.error("Mutation Error:", error);
    },
  });

  const [isEditing, setEditing] = useState(false);

  const handleSubmit = () => {
    mutation.mutate(editedTitle, selectedUser);
  };

  if (isEditing === true) {
    return (
      <>
        <input
          value={editedTitle}
          onChange={e => setEditedTitle(e.target.value)}
        ></input>
        <button onClick={handleSubmit}>Submit</button>
        <UserSelect
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </>
    );
  }

  return (
    <div>
      <h2>{data?.title}</h2>
      <button onClick={() => setEditing(!isEditing)}>edit</button>
    </div>
  );
};

export default Details;
