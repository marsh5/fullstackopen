import React, { useState } from 'react'

function CreateBlog({ createNew }) {
const [title, setTitle] = useState('');
const [author, setAuthor] = useState('');
const [url, setUrl] = useState('');

const handleBlogCreate = (ev) => {
    ev.preventDefault();
    createNew(title, author, url);
    setTitle('');
    setAuthor('');
    setUrl('');
}


    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleBlogCreate}>
                <div>
                    title
                    <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url
                    <input
                    type="text"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form> 
        </div>
    )
}

export default CreateBlog
