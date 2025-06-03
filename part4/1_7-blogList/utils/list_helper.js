const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  if(blogs.length === 0) return 0

  if(blogs.length === 1){
    return blogs[0].likes
  }

  return blogs.reduce((sum, currBlog) => sum + currBlog.likes, 0)
}

const favoriteBlog = blogs => {
  if(blogs.length === 0) return null

  return blogs.reduce((max, blog) =>
    blog.likes > max.likes ? blog : max
  )
}

const mostBlogs = blogs => {
  if(!blogs || blogs.length === 0) return null
  const grouped = _.groupBy(blogs, 'author')

  const blogCounts = _.map(grouped, (value, key) => ({
    author: key,
    blogs: value.length
  }))

  return _.maxBy(blogCounts, 'blogs')
}

const mostLikes = blogs => {
  if(!blogs || blogs.length === 0) return null

  const grouped = _.groupBy(blogs, 'author')

  const likeCounts = _.map(grouped, (value, key) => ({
    author: key,
    likes: _.sumBy(value, 'likes')
  }))

  return _.maxBy(likeCounts, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}