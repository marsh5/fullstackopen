import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    console.log(content)
    const object = { content, votes: 0 }
    const req = await axios.post(baseUrl, object);
    return req.data
}

const updateVote = async (obj) => {
    const id = obj.id;
    let votes = obj.votes + 1;
    const object = {
        ...obj, votes
    }
    const res = await axios.put(`${baseUrl}/${id}`, object)
    return res.data;
}

export default { getAll, createNew, updateVote }