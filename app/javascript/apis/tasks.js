import axios from 'axios'

const fetch = () => axios.get("/tasks");
const create = payload => axios.post("/tasks", payload);
const show = slug => axios.get(`/tasks/${slug}`);
const edit = (slug,payload) => axios.put(`/tasks/${slug}`, payload);

const tasksApi = { fetch, create , show, edit};

export default tasksApi;
