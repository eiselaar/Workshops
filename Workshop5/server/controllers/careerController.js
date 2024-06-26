const Career = require("../models/careerModel");
//
/**
 * Creates a Career
 *
 * @param {*} req
 * @param {*} res
 */

const careerPost = async (req, res) => {
    let career = Career(req.body);
    await career.save()
      .then(career => {
        res.status(201); // CREATED
        res.header({
          'location': `/api/career/?id=${career.id}`
        });
        res.json(career);
      })
      .catch( err => {
        res.status(422);
        console.log('error while saving the Career', err);
        res.json({
          error: 'There was an error saving the Career'
        });
      });
  };

  /**
 * Get all courses or one
 *
 * @param {*} req
 * @param {*} res
 */
const careerGet = (req, res) => {
    // if an specific teacher is required
    if (req.query && req.query.id) {
      Career.findById(req.query.id)
        .then( (career) => {
          res.json(career);
        })
        .catch(err => {
          res.status(404);
          console.log('error while queryting the Career', err)
          res.json({ error: "Career doesnt exist" })
        });
    } else {
      // get all teachers
      Career.find()
        .then( Career => {
          res.json(Career);
        })
        .catch(err => {
          res.status(422);
          res.json({ "error": err });
        });
    }
  };

  const careerPut = async (req, res) => {
    try {
      const careerId = req.query.id;
      const updatedCareer = req.body;
  
      const career = await Career.findByIdAndUpdate(careerId, updatedCareer, { new: true });
  
      if (!career) {
        return res.status(404).json({ error: 'Career not found' });
      }
  
      res.json(career);
    } catch (error) {
      console.error('Error updating the career', error);
      res.status(500).json({ error: 'There was an error updating the career' });
    }
  };
  
  const careerDelete = async (req, res) => {
    if (req.params && req.params.id) {

      const career = await Career.findById(req.params.id);
      if (!career) {
        return res.status(404).json({ error: 'Career not found' });
      }
  
      await career.deleteOne();
      res.status(204); //No content
      res.json({});
     // });
   

  } else {
    res.status(404);
    res.json({ error: "Carrer doesnt exist else" })
  }
  };

  module.exports = {
    careerPost,
    careerGet,
    careerPut,
    careerDelete
  }