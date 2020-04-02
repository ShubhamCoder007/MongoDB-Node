const mongoose = require('mongoose');

//connecting, connection string
//connect returns a promise
mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('connected to MongoDB...'))
.catch(err => console.log('Some error occured: ',err));

//the schema is only an implementation in mongoose
//mongodb doesn't have schema as such
const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    Date: {type: Date, default: Date.now},
    tags: [String],
    isPublished: Boolean
});

//compiling the schema to create class
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'React',
        author: 'Shubham',
        tags: ['react', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    //promise implement
    // Course.find().then(res => console.log(res));
    //async
    const Courses = await Course.find({author: 'Shubham'})
        .limit(10)
        .sort({name: 1})
        .select({name: 1, tags: 1});
    console.log(Courses);
}

//createCourse();
getCourses();
