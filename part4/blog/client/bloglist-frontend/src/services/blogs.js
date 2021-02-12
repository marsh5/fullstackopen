import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (obj) => {
    const config = {
      headers: { Authorization: token },
    }

    const request = await axios.post(baseUrl, obj, config);
    return request.data;
}

export default { getAll, setToken, createBlog }