//mongoimport --db mongo-exercises --collection courses --drop --file exercise-data.json --jsonArray

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/mongo-exercises")
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Error occured while connecting...',err));

    //schema is required when compiling class and sending data for loading its not
// const courseSchema = mongoose.Schema({
//     // name: String,
//     // author: String,
//     // date: {type: Date, default: Date.now},
//     // isPublished: Boolean,
//     // price: Number,
//        tags: [String]
// });

//directly inject schema here
const Course = mongoose.model('courses', mongoose.Schema());

async function getCourse() {
    const course = await Course.find({isPublished: true, tags: 'backend'})
        .sort({name: 1})
        .select({name: 1, author: 1, tags: 1});

    console.log(course);
}

getCourse();