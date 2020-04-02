//mongoimport --db mongo-exercises --collection courses --drop --file exercise-data.json --jsonArray

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/mongo-exercises")
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Error occured while connecting...',err));

    //schema is required when compiling class and sending data for loading its not
// const courseSchema = new mongoose.Schema({
//     // name: String,
//     // author: String,
//     // date: {type: Date, default: Date.now},
//     // isPublished: Boolean,
//     // price: Number,
//        tags: [String]
// });

//directly inject schema here
const Course = mongoose.model('courses', new mongoose.Schema());

async function getCourse() {
    //exc 1
    // return await Course.find({isPublished: true, tags: 'backend'})
    //     .sort({name: 1})
    //     .select({name: 1, author: 1, tags: 1});

    //exc 2
    // return await Course.find({isPublished: true})
    //         .or({tags: 'frontend'}, {tags: 'backend'})
    //         .sort('-price')
    //         .select('name author price tags');

    //exc 3
    return await Course.find({isPublished: true})
            .or([{price: {$gte: 15}}, 
                {name:/.*by.*/i }])
            .sort('-price')
            .select('name price title course');
}

async function show() {
    const course = await getCourse();
    console.log(course);
}

show();