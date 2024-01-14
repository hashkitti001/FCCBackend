const dotenv = require('dotenv').config();
const mongoose = require("mongoose")
console.log(process.env.MONGO_URI)
let uri = process.env.MONGO_URI
async function main() {
  // let uri = process.env.MONGO_URI;
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  // console.log("Connected to", uri);
}
main().catch(err => console.error(err))
let personSchema = new mongoose.Schema({
  name: {
    type:String
  },
  age: {
    type:Number
  },
  favoriteFoods: {
    type: [String]
  }
});
let Person =  mongoose.model("Person", personSchema)

const createAndSavePerson = (done) => {
    let person = new Person({
      name: "Tina",
      age: 24,
      favoriteFoods: ["Chocolate"]
    })
    person.save(done);
  }
  


  // done(null /*, data*/);
createAndSavePerson()

const createManyPeople = (arrayOfPeople, done) => {
  console.log(arrayOfPeople);
  Person.create(arrayOfPeople, done).then((r) => console.log("saved: ", r));
};
const findPeopleByName = (personName, done) => {
 Person.find({name: personName}, done)
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
