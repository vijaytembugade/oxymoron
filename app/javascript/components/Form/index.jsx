import React, { useState } from "react";
import tasksApi from "../../apis/tasks";
import UserSelect from "./UserSelect";
import { useMutation } from "@tanstack/react-query";

const Form = () => {
  const [input, setInput] = useState();
  const [selectedUser, setSelectedUser] = useState();

  const {
    mutate: createTask,
    isPending,
    error,
  } = useMutation({
    mutationFn: taskData => tasksApi.create(taskData),
    onSuccess: () => {
      window.location.replace("/");
    },
    onError: error => {
      console.log(error);
    },
  });

  console.log("selectedUser", selectedUser);

  const handleClick = () => {
    createTask({ task: { title: input, assigned_user_id: selectedUser } });
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleClick}>submit</button>
      <UserSelect
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </>
  );
};

export default Form;
