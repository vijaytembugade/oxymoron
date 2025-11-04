import axios from "axios";

const fetch = () => axios.get("/users");
const create = payload => axios.post("/users", payload);

const usersApi = { fetch, create };

export default usersApi;
