const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


const initalizeBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
      },
  ]

  beforeEach(async () => {
    await Blog.deleteMany({})
  
    const blogObjects = initalizeBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  });

  test('blog is returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  });

  test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs');
      console.log(response.body);
      expect(response.body).toHaveLength(initalizeBlogs.length);
  });

  test('blog id is named id and not _id', async () => {
      const response = await api.get('/api/blogs');
      expect(response.body[0].id).toBeDefined();
  });

  test('a valid blog can be added', async () => {
      const newBlog = {
        title: "Slavic",
        author: "Henry Cantroini",
        url: "https://slavic.com",
        likes: 20,
      }

      await api.post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await Blog.find({});
      blogsAtEnd.map(blog => blog.toJSON());
      expect(blogsAtEnd).toHaveLength(initalizeBlogs.length + 1);
      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).toContain(
          'Slavic'
      )
  });

  test('likes property defaults to 0', async () => {
    const newBlog = {
        title: "Defaulter",
        author: "Bob CantroiniBoozvoeri",
        url: "https://sladvic.com",
      }

      await api.post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await Blog.find({});
      blogsAtEnd.map(blog => blog.toJSON());
      expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
  })

  test('note without author is not added', async () => {
      const newBlog = {
          url: "dssdfsd.com"
      }

      await api.post('/api/blogs')
      .send(newBlog)
      .expect(400);

      const blogsAtEnd = await Blog.find({});
      blogsAtEnd.map(blog => blog.toJSON());
      expect(blogsAtEnd).toHaveLength(initalizeBlogs.length);
  })



  afterAll(() => {
    mongoose.connection.close()
  })