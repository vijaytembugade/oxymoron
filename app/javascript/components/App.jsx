import axios from "axios";
import React, {useEffect, useState} from "react";
const baseUrl = 'http://localhost:3000'

const App = () => {
    const [tasks, setTask] = useState([]);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('tasks')
            setTask(data?.tasks)
        })();

    }, [])

    return <div>
        {tasks.map((task) => {
            return <p>{task?.title}</p>
        })}
    </div>
};

export default App;  