import Blog from "./Blog.jsx";

const BlogContent = ({blogs, updateBlog, deleteBlog}) => {
    return (
        <>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
            )}
        </>
    )
}

export default BlogContent