const mongoose = require('mongoose');

if(process.argv.length !== 3 && process.argv.length !==5){
    console.log('Please enter the correct number of arguments');
    process.exit(1);
}


  const password = process.argv[2];

  const url =
  `mongodb+srv://fullstack:${password}@cluster0.w4yq2.mongodb.net/phonebook-db?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const noteSchema = new mongoose.Schema({
    name: String,
    date: Date,
    number: String,
  })
  
  const Person = mongoose.model('Person', noteSchema)
  
  const person = new Person({
    name: process.argv[3],
    date: new Date(),
    number: process.argv[4],
  });

  if(process.argv.length === 3){
    console.log('Phonebook:');    
    Person.find({}).then(result => {
      result.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    });
  } else{
    person.save().then(result => {
        console.log(`added ${result}`)
        mongoose.connection.close()
      })
  }

  
  
  
//   Note.find({}).then(result => {
//       result.forEach(note => {
//         console.log(note)
//       })
//       mongoose.connection.close()
//     });