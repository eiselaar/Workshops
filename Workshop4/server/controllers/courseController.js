const Course = require("../models/courseModel");

/**
 * Creates a course
 *
 * @param {*} req
 * @param {*} res
 */
const coursePost = async (req, res) => {
  let course = new Course(req.body);
  await course.save()
    .then(course => {
      res.status(201); // CREATED
      res.header({
        'location': `/api/courses/?id=${course.id}`
      });
      res.json(course);
    })
    .catch( err => {
      res.status(422);
      console.log('error while saving the course', err);
      res.json({
        error: 'There was an error saving the course'
      });
    });
};

/**
 * Get all courses or one
 *
 * @param {*} req
 * @param {*} res
 */
const courseGet = (req, res) => {
  // if an specific teacher is required

  if (req.query && req.query.name) {

    const { name, sort } = req.query;
    
    const query = Course.find();

    if (name) {
      query.where({ name: { $regex: name, $options: "i" } });
    }

    if (sort === "asc") {
      query.sort({ name: 1 });
    } else if (sort === "desc") {
      query.sort({ name: -1 });
    }

    query.populate('teacher')
      .then(courses => {
        res.json(courses);
      })
      .catch(err => {
        res.status(422);
        res.json({ "error": err });
      });
  

  } else {
    Course.find().populate('teacher')
    .then((course) => {
      res.json(course);
    })
    .catch(err => {
      res.status(404);
      console.log('error while queryting the course', err)
      res.json({ error: "Course doesnt exist" })
    });

   
  } }
;



module.exports = {
  coursePost,
  courseGet,
  
}