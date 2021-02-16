const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//         return authorization.substring(7)
//       }
//       return null
//     }


blogsRouter.get('/', async (request, response) => {
    
    const blogs = await Blog.find({}).populate('user', {username: 1, name:1});
    
    // const blogs = await Blog.find({})
    // let newBlogs = await Promise.all(blogs.map(async el => {
    //     console.log(el.user);
    //     if(!el.user) return el;
    //     let user1 = await User.findById(el.user);
    //     return {
    //         likes: el.likes,
    //         title: el.title,
    //         author: el.author,
    //         id: el.id,
    //         user: {
    //             username: user1.username,
    //             name: user1.name
    //         }
    //     }
        
    // }))

    // console.log(newBlogs);


    response.json(blogs);
    
    // Blog
    //   .find({})
    //   .then(blogs => {
    //     response.json(blogs)
    //   })
  })
  
  blogsRouter.post('/', async (request, response, next) => {
    const body = request.body;
    const token = request.token;
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, process.env.SECRET);
    } catch (error) {
        return response.status(401).json({
            error: 'invalid token'
        })
    }

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }

      const user = await User.findById(decodedToken.id)

      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
      })


    try {
        const savedBlog = await blog.save();
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();
        response.json(savedBlog);
        // response.status(201).json(savedBlog);
    } catch (error) {
        console.log('YIKES');
        response.status(400).end();
        console.log('YIKES2');
        next(error);
    }
  
  });

  blogsRouter.delete('/:id', async (request,response, next) =>{
    let decodedToken;
    console.log(request.token);
    try {
        decodedToken = jwt.verify(request.token, process.env.SECRET);
    } catch (error) {
        return response.status(401).json({
            error: 'invalid token'
        })
    }
      try {
        const blog = await Blog.findById(request.params.id);

        if(blog.user.toString() === decodedToken.id.toString()){
            await Blog.findByIdAndRemove(request.params.id);
            console.log('right');
            response.status(204).end()
        } else{
            console.log('wrong');
            response.status(401).end()
        }
        
        //   await Blog.findByIdAndRemove(request.params.id);
          
          
      } catch (exception) {
          next(exception)
      }
  })

  blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body;
    let decodedToken;
    console.log(request.token);
    try {
        decodedToken = jwt.verify(request.token, process.env.SECRET);
    } catch (error) {
        return response.status(401).json({
            error: 'invalid token'
        })
    }

    console.log(body);
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

      try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true});
        response.json(updatedBlog)
      } catch (exception) {
          next(exception);
      }
  })

  module.exports = blogsRouter;