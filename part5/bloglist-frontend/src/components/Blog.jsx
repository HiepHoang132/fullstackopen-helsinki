import {useState} from "react";

const Blog = ({ blog , updateBlog, deleteBlog}) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [visible, setVisible] = useState(false)
    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

    const handleLike = () => {
        updateBlog(blog.id, {
            user: blog.user.id,
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.author,
            url: blog.url
        })
    }

    const removeBlog = () => {
        if(confirm(`Remove blog ${blog.title} by ${blog.author}`)){
            deleteBlog(blog.id)
        }
    }

    return (
        <div style={blogStyle}>
            <div style={hideWhenVisible}>
                {blog.title} {blog.author}
                <button onClick={() => setVisible(true)}>view</button>
            </div>
            <div style={showWhenVisible}>
                <div>
                    {blog.title} {blog.author}
                    <button onClick={() => setVisible(false)}>hide</button>
                </div>
                <div>
                    {blog.url}
                </div>
                <div>
                    likes {blog.likes}
                    <button onClick={handleLike}>like</button>
                </div>
                <div>
                    {blog.user?.name}
                </div>
                <button onClick={removeBlog}>remove</button>
            </div>
        </div>
    )
}

export default Blog