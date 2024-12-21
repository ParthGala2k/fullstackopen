const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, val) => acc + val.likes, 0)
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  return blogs.reduce((prev, curr) => prev.likes > curr.likes ? prev : curr)
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}