import React, { useState } from "react";
import tasksApi from "../../apis/tasks";

const Form = () => {
  const [input, setInput] = useState();

  const handleClick = async () => {
    try {
      await tasksApi.create({ task: { title: input } });
      // history.push("/dashboard");
    } catch (error) {
        console.log(error)
    }
  };
  
  return (
    <>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleClick}>submit</button>
    </>
  );
};

export default Form