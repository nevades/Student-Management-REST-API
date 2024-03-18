const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;

  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.send("Email already exists.");
    }

    pool.query(
      queries.addStudent,
      [name, email, age, dob],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("Student Created Sucessfully");
      }
    );
  });
};

const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.checkStudentExists, [id], (error, results) => {
    if (results.rows.length) {
      pool.query(queries.delStudent, [id], (error, results) => {
        if (error) throw error;
        res.status(201).send("Student Deleted Sucessfully");
      });
    } else {
      res.send("Student with specific ID dosen't exist");
    }
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  removeStudent,
};
