import React, { useState, useEffect, useRef } from 'react'
import ShowBlogs from './components/ShowBlogs'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import Toggable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);
  const [successPost, setSuccessPost] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const noteFormRef = useRef();

  useEffect(async () => {
   const blogs = await blogService.getAll()
   blogs.sort((a,b) => b.likes - a.likes ) 
   setBlogs( blogs )
    
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
      noteFormRef.current.toggleVisibility()

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

  const createNoteForm = () => (
    <Toggable buttonLabel = "new note" ref={noteFormRef}>
      <CreateBlog createNew={createNew} />
    </Toggable>
  )

  const handleBlogUpdate = (blog, id) => {
    setBlogs(blogs.map((el) => (el.id !== id ? el : blog)));
  }

  const handleBlogRemove = id => {
    setBlogs(blogs.filter(el => el.id !== id))
  }



  return (
    <>
    <ShowError />
    {user === null ? 
    <LoginForm goLogin={goLogin}/> :
      <>
      <h2>blogs</h2>
      <p>{user.name} is logged in <button onClick={handleLogout}>logout</button></p>
      {createNoteForm()}
      <ShowSuccess />
      <div>&nbsp;</div>
    <ShowBlogs blogs={blogs} handleBlogUpdate={handleBlogUpdate} handleBlogRemove={handleBlogRemove} />
    </>
    }
    
    </>
  )
}

export default App