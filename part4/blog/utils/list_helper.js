const dummy = (blogs) => {
    return 1;
  }

  const totalLikes = (blogs) => {
    return blogs.reduce((acc,cur) => {
      return acc + cur.likes
    }, 0)
  }

  const favoriteBlog = (blogs) => {
    let fav = blogs.reduce((acc, cur) => {
      if(cur.likes > acc.likes){
        return cur;
      } else{
        return acc;
      }
    })
    let {title, author, likes} = fav;
    //destructuring: so title = fav.title;
    //then return an object using object ES6 object initializer/shorthand
    return {title, author, likes};
  }

  const mostBlogs = (blogs) => {
    let obj = {};
    blogs.forEach(el => {
      if(!obj[el.author]){
        obj[el.author] = 1;
      } else{
        obj[el.author]++;
      }
    })
    let max = 0;
    let maxName = '';
    for (let i in obj){
      if (obj[i] > max){
        maxName = i;
        max = obj[i]
      }
    }
    let newObj = { 
      author: maxName,
      blogs: max
    }
    return newObj;
  }

  const mostLikes = (blogs) => {
    let obj = {};
    blogs.forEach(el => {
      obj[el.likes] = el.author;
    });
    let max = 0;
    for (let prop in obj){
      if(parseInt(prop) > max){
        max = parseInt(prop);
      }
    }

    return {
      author: obj[max],
      likes: max
    }
  }
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }

  