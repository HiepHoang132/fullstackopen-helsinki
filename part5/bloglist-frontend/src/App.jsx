import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
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

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try{
      const newBlog = await blogService.create({title, author, url})

      showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, true)
      setBlogs([...blogs, newBlog])
      setTitle("")
      setAuthor("")
      setUrl("")
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
        <>
          <form onSubmit={handleCreateBlog}>
            <div>
              title:
              <input
                  type="text"
                  value={title}
                  onChange={({target}) => setTitle(target.value)}
                  name="Title"
              />
            </div>
            <div>
              author:
              <input
                  type="text"
                  value={author}
                  onChange={({target}) => setAuthor(target.value)}
                  name="Author"
              />
            </div>
            <div>
              url:
              <input
                  type="text"
                  value={url}
                  onChange={({target}) => setUrl(target.value)}
                  name="Url"
              />
            </div>
            <button type="submit">create</button>
          </form>
        </>
    )
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
          <>
            <div className="user-header">
              {user.username} logged in
              <button onClick={handleLogout}>logout</button>
            </div>
            <div>
              <h2>create new</h2>
              {blogForm()}
            </div>
          </>
      )}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App