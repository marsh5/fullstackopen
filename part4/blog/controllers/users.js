const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  if(body.password.length < 3){
      return response.status(400).json({error: 'password must be at least 3 characters'});
  } 


  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })


  try {
    const savedUser = await user.save()
    response.json(savedUser)
      
  } catch (error) {
      return response.status(400).json({error: error.message})
  }

  
});


usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs');
    response.json(users);
})
module.exports = usersRouter