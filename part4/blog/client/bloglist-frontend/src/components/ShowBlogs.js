import React from 'react'
import Blog from './Blog';
const ShowBlogs = ({ blogs, handleBlogUpdate, handleBlogRemove }) => {
    console.log('BLOGs', blogs)
  return(
    <div>
        
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleBlogUpdate={handleBlogUpdate} handleBlogRemove={handleBlogRemove} />
        )}
    </div>
  )
  
}

export default ShowBlogs