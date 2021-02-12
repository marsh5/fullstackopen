import React, { useState, useEffect } from 'react'
import ShowBlogs from './components/ShowBlogs'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);
  const [successPost, setSuccessPost] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);

  }

  const goLogin =  async (username, password) => {
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token);
      setUser(user);

    } catch (exception) {
      setErrorMessage('Wrong Credentials');
      setTimeout(()=> {
        setErrorMessage(null)
    }, 5000)
    }
  }

  const createNew = async (title, author, url) => {
      
    const blogObject = {
        title, author, url
      }

      try {
        const res = await blogService.createBlog(blogObject);
        setBlogs(blogs.concat(res));
        setSuccessPost('Blog post created');
      setTimeout(()=> {
        setSuccessPost(null)
    }, 5000)
      } catch (error) {
        
      }
      
  }

  const ShowError = () => {
    if(errorMessage !== null){
      return <div>Wrong Username or password</div>
    } else{
      return null;
    }
  }

  const ShowSuccess = () => {
    if(successPost !== null){
      return <div>blog added</div>
    } else{
      return null;
    }
  }


  return (
    <>
    <ShowError />
    {user === null ? 
    <LoginForm goLogin={goLogin}/> :
      <>
      <h2>blogs</h2>
      <p>{user.name} is logged in <button onClick={handleLogout}>logout</button></p>
      <CreateBlog createNew={createNew}/>
      <ShowSuccess />
      <div>&nbsp;</div>
    <ShowBlogs blogs={blogs} />
    </>
    }
    
    </>
  )
}

export default App