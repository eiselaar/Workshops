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
/*const courseGet = (req, res) => {
  // if an specific teacher is required
  if (req.query && req.query.id) {
    Course.findById(req.query.id).populate('teacher')
      .then( (course) => {
        res.json(course);
      })
      .catch(err => {
        res.status(404);
        console.log('error while queryting the course', err)
        res.json({ error: "Course doesnt exist" })
      });
  } else {
    // get all teachers
    Course.find().populate('teacher')
      .then( courses => {
        res.json(courses);
      })
      .catch(err => {
        res.status(422);
        res.json({ "error": err });
      });
  }
};*/

const courseGet = async (req, res) => {
  try {
    const { name, sort } = req.query;
    let filter = {};
    let sortOrder = {};

    if (name) {
      filter.name = new RegExp(name, 'i'); // case-insensitive regex search
    }

    if (sort) {
      sortOrder.name = sort === 'asc' ? 1 : -1; // sort by name
    }

    const courses = await Course.find(filter).sort(sortOrder);
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: 'There was an error retrieving the courses' });
  }
};


module.exports = {
  coursePost,
  courseGet,
  
}