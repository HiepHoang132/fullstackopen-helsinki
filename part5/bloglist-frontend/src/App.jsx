import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification.jsx";
import BlogForm from "./components/BlogForm.jsx";
import Togglable from "./components/Togglable.jsx";
import BlogContent from "./components/BlogContent.jsx";

const App = compareFn => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')

    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch(error){
      if(error.response.status === 401){
        showNotification("wrong username or password", false)
      } else {
        showNotification(error.message, false)
      }
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
  }

  const addBlog = (blogObject) => {
    try{
      blogService
          .create(blogObject)
          .then(newBlog => {
            setBlogs([...blogs, newBlog])
            showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, true)
          })
    } catch (error){
      setMessage(error.message)
    }
  }

  const updateBlog = async (id, blogObject) => {
    try{
      blogService
          .update(id, blogObject)
          .then(newBlog => {
            setBlogs(blogs.map(blog => blog.id !== id ? blog : newBlog))
            showNotification("Liked!", true)
          })
    } catch (error){
      setMessage(error.message)
    }
  }

  const deleteBlog = async (id) => {
    try{
      blogService
          .deleteBlog(id)
          .then(() => {
            setBlogs(blogs.filter(blog => blog.id !== id))
            showNotification("Deleted!", true)
          })
    } catch (error){
      setMessage(error.message)
    }
  }

  const showNotification = (message, success) => {
    setMessage(message)
    setSuccess(success)

    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }

  const loginForm = () => {
    return (
        <>
          <div>Log into application</div>
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                  type="text"
                  value={username}
                  onChange={({target}) => setUsername(target.value)}
                  name="Username"
              />
            </div>
            <div>
              password
              <input
                  type="password"
                  value={password}
                  onChange={({target}) => setPassword(target.value)}
                  name="Password"
              />
            </div>
            <button type="submit">login</button>
          </form>
        </>
    )
  }

  const blogForm = () => {
    return (
      <Togglable>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
    )
  }

  const sortDescending = () => {
    setBlogs([...blogs].sort((a, b) => b.likes - a.likes))
  }

  const sortAscending = () => {
    setBlogs([...blogs].sort((a, b) => a.likes - b.likes))
  }

  if(user === null){
    loginForm()
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} success={success}/>
      {!user && loginForm()}
      {user && (
            <div className="user-header">
              {user.username} logged in
              <button onClick={handleLogout}>logout</button>
            </div>
      )}
      <button onClick={sortDescending}>Highest likes</button>
      <button onClick={sortAscending}>Lowest likes</button>
      {user && blogForm()}
      <BlogContent blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
    </div>
  )
}

export default App