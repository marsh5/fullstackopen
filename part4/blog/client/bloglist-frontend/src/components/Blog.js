import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, handleBlogUpdate, handleBlogRemove }) => {
  const [viewDetails, setViewDetails] = useState(false);

  const toggleDetails = () =>{
    setViewDetails(!viewDetails);
  }
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async (blog) => {
    const id = blog.id;
    let likes = ++ blog.likes;

    const blogObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes,
    }

   try {
     const res = await blogService.addLike(id, blogObj);
     let newObj;
     if(blog.hasOwnProperty('user')){
       newObj = {...res, user: blog.user}
     } else{
      newObj = res;
     }
    
      handleBlogUpdate(newObj, id);
     console.log('succesful post', res);
     
   } catch (error) {
     console.log('ERROR!', error);
   }
  }

  const handleRemove = async (blog) => {
    const id = blog.id;
    if(window.confirm("Are you sure you want to Delete?")){
      try {
        await blogService.deleteBlog(id);
        console.log('blog deleted');
        handleBlogRemove(id);
      } catch (error) {
        console.log("ERROR", error);
      }
    }

  }


  return(
    <div style={blogStyle}>
      {!viewDetails ? 
      <> 
      {blog.title} {blog.author}
      <button onClick={toggleDetails}>view</button>
      </> :
      <> {blog.title} {blog.author} 
       <button onClick={toggleDetails}>hide</button>
        <p>
        {blog.url}
        </p>
        <p>
        likes: {blog.likes} <button onClick ={() => handleLike(blog)}>like</button>
        </p>
        <p>
        {blog.hasOwnProperty('user') ? blog.user.name:
        'No User'}
        </p>
        <p> <button onClick={() => handleRemove(blog)}>remove</button></p>
        
        
       
      </>}
    
  </div>
  )
 
}

export default Blog
