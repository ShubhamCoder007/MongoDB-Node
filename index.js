const mongoose = require('mongoose');

//connecting, connection string
//connect returns a promise
mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('connected to MongoDB...'))
.catch(err => console.log('Some error occured: ',err));

//the schema is only an implementation in mongoose
//mongodb doesn't have schema as such
const courseSchema = new mongoose.Schema({
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


async function updateCourse(id) {
    const course = await Course.findById(id);
    if(!course) return;

    // course.isPublished = true;
    // course.author = "another one";

    course.set({
        isPublished: true,
        author: "Another name"
    });

    const result = await course.save();
    console.log(result);
}

async function updateFirst(id) {
    //update(condition, updates)
    const result = await Course.findByIdAndUpdate({ _id: id}, 
        {
            $set:{
                isPublished: true,
                author: 'Shubham'
            }
        }, {new: true});
    
    console.log(result);
}

async function removeCourse(id) {
    // const result = await Course.deleteOne({ _id: id});
    const course = await Course.findByIdAndRemove(id);
    console.log(result);
}

removeCourse('5a68fdd7bee8ea64649c2777');
// updateFirst('5a68fdd7bee8ea64649c2777');
//createCourse();
// getCourses();
